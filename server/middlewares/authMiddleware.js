import JWT from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';
import userSchema from '../models/user.js';

export const requireSignIn = (req,res,next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            JWT_SECRET
        );
        req.user = decode;
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
        console.log(req);
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