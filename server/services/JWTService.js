import jwt from 'jsonwebtoken';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../config/index.js';
import refreshTokenSchema from '../models/token.js';

class JWTService{
    // sign access token
    static signAccessToken(payload, expiryTime){
        return jwt.sign(payload, ACCESS_TOKEN, {expiresIn: expiryTime});
    }

    // sign refresh token
    static signRefreshToken(payload, expiryTime){
        return jwt.sign(payload, REFRESH_TOKEN, {expiresIn: expiryTime});
    }

    // verify access token
    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN);
    }

    // verify refresh token
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN);
    }

    // store refresh token
    static async storeRefreshToken(token, userId){
        try{
            const newToken = new refreshTokenSchema({
                token: token,
                userId: userId
            });

            // store in db
            await newToken.save();
        }
        catch(error){
            console.log(error);
        }
    }
}
export default JWTService;