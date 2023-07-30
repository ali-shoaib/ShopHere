import { JWT_SECRET } from '../config/index.js';
import { comparePassword, hashPassword } from '../helpers/bcrypt.js';
import userSchema from '../models/user.js';
import jwt from 'jsonwebtoken';

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
            user
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

        // token
        const token = await jwt.sign({_id:user._id}, JWT_SECRET, {
            expiresIn:'7d'
        })

        res.status(200).send({
            success:true,
            message:"Login Successful!",
            user:{
                name:user.name,
                email:user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                createdAt: user.createdAt
            },
            token
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

export const testRoute = (req,res) => {
    try{
        res.send("Protected Route");
    }
    catch(err){
        console.log(err);
    }
}