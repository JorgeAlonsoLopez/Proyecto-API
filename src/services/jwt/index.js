  
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const jwtLifetime = process.env.JWT_LIFETIME;
const jwtAlgorithm = process.env.JWT_ALGORITHM

export const JwtService = {

    sign: (user) => jwt.sign({sub: user._id}, secret, {
                        algorithm: jwtAlgorithm,
                        expiresIn: jwtLifetime
                    })
    
    ,

    verify: (token) => jwt.verify(token, secret)

    
}