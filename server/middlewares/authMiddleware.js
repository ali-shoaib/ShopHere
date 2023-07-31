import userSchema from '../models/user.js';
import User from '../models/user.js';
import JWTService from '../services/JWTService.js';

export const auth = async(req,res,next) => {
    try {
        const {refreshToken, accessToken} = req.cookies;

        if (!refreshToken || !accessToken){
            const error = {
                status: 401,
                message: 'Unauthorized'
            }
    
            return next(error);
        }
    
        let _id;
    
        try{
            _id = JWTService.verifyAccessToken(accessToken)?._id;
        }
        catch(error){
            return next(error);
        }
    
        let user;
    
        try{
            user = await User.findOne({_id: _id});
        }
        catch(error){
            return next(error);
        }
    
        let UserDTO = {
            name:user.name,
            email:user.email,
            gender: user.gender,
            createdAt: user.createdAt,
            _id: user._id
        }
    
        req.user = UserDTO;
    
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error",
            error
        });
    }
}

export const isAdmin = async(req,res,next) => {
    try {
        // const {_id} = req.body;
        const user = await userSchema.findById(req.user._id)
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized Access",
                user:req.user
            });
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success:false,
            message:"Error in admin middleware",
            err
        });
    }
}