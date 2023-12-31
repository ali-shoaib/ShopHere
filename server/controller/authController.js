import { JWT_SECRET } from '../config/index.js';
import { comparePassword, hashPassword } from '../helpers/bcrypt.js';
import userSchema from '../models/user.js';
import jwt from 'jsonwebtoken';
import JWTService from '../services/JWTService.js'
import refreshTokenSchema from '../models/token.js';

export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone,address,gender} = req.body;

        if(!name){
            return res.send({error:'Name is required'});
        }
        if(!email){
            return res.send({error:'email is required'});
        }
        if(!password){
            return res.send({error:'password is required'});
        }
        if(!phone){
            return res.send({error:'phone is required'});
        }
        if(!address){
            return res.send({error:'address is required'});
        }
        if(!gender){
            return res.send({error:'gender is required'});
        }

        const userExist = await userSchema.findOne({email});

        if(userExist){
            return res.send({error:'user already exists'});
        }

        const hashedPassword = await hashPassword(password);

        const user = await new userSchema({
            name,
            email,
            phone,
            gender,
            address,
            password: hashedPassword
        }).save();

        res.status(201).send({
            success:true,
            message:"User Registered!",
            user:{
                name:user.name,
                email:user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                createdAt: user.createdAt
            },
        })
    }
    catch(err){
        console.log(err);
    }
}

export const loginController = async(req,res) => {
    try{
        const {email, password} = req.body;

        if(!password || !email){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            });
        }

        const user = await userSchema.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered"
            });
        }

        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            });
        }

        const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
        const refreshToken = JWTService.signRefreshToken({ _id: user._id }, "60m");

        // update refresh token in database
        try {
            await refreshTokenSchema.updateOne(
                {
                _id: user._id,
                },
                { token: refreshToken },
                { upsert: true }
            );
        } catch (error) {
            return next(error);
        }

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        res.status(200).send({
            success:true,
            message:"Login Successful!",
            user:{
                name:user.name,
                email:user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                createdAt: user.createdAt,
                role: user.role
            },
        });
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            err
        }); 
    }
}

export const refresh = async(req,res,next) => {
    const originalRefreshToken = req.cookies.refreshToken;

    let id;

    try {
        id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
    } 
    catch (e) {
        const error = {
            status: 401,
            message: "Unauthorized",
        };

        return next(error);
    }

    try {
        const match = refreshTokenSchema.findOne({
            _id: id,
            token: originalRefreshToken,
        });

        if (!match) {
            const error = {
            status: 401,
            message: "Unauthorized",
            };

            return next(error);
        }
    } catch (e) {
        return next(e);
    }

    try {
        const accessToken = JWTService.signAccessToken({ _id: id }, "30m");

        const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

        await refreshTokenSchema.updateOne({ _id: id }, { token: refreshToken });

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
    } catch (e) {
        return next(e);
    }

    const user = await userSchema.findOne({ _id: id });

    let UserDTO = {
        name:user.name,
        email:user.email,
        gender: user.gender,
        createdAt: user.createdAt,
        _id: user._id,
        address: user.address,
        role: user.role
    }

    return res.status(200).json({ user: UserDTO, auth: true });
}

export const logoutController = async(req,res) => {
    try{
        const { refreshToken } = req.cookies;

        try {
        await refreshTokenSchema.deleteOne({ token: refreshToken });
        } catch (error) {
        res.json({message:error});
        }

        // delete cookies
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        // 2. response
        res.status(200).json({ user: null, success:true });
    }
    catch(err){
        console.log(err);
    }
}

export const dashboard = (req,res) => {
    try{
        const {name,email} = req.user;
        res.status(200).json({
            message:"Hey admin!",
            user:{name,email},
            admin:true
        });
    }
    catch(err){
        console.log(err);
    }
}

export const testRoute = (req,res) => {
    try{
        res.send("Protected Route");
    }
    catch(err){
        console.log(err);
    }
}