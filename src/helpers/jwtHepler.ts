import jwt from 'jsonwebtoken';
import envConfig from 'src/config/config';
import crypto from 'crypto'



export interface IpayloadJWT {
    email:string,
}

// const  ACCESS_TOKEN_SECRET  = envConfig.jwt.access_token.secret
//const REFRESH_TOKEN_SECRET = envConfig.jwt.refresh_token.secret
const ACCESS_TOKEN_EXPIRE_TIME = envConfig.jwt.access_token.expire
const REFRESH_TOKEN_EXPIRE_TIME = envConfig.jwt.refresh_token.expire


export const CreateToken = async (payload: IpayloadJWT, publicKey: string, privateKey:string) => {
    const access_token = await jwt.sign(payload, publicKey as string, {
        expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    });
    const refresh_token = await jwt.sign(payload, privateKey as string, {
        expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    });
    
    return {access_token,refresh_token}
}
// export const verifyAccessToken = (token: string) => {
//     return jwt.verify(token, ACCESS_TOKEN_SECRET as string);
// };

// export const verifyRefreshToken = (token: string) => {
//     return jwt.verify(token, REFRESH_TOKEN_SECRET as string);
// };


// export const generateAccessToken = (payload: IpayloadJWT) => {
//     return jwt.sign(payload, ACCESS_TOKEN_SECRET as string, {
//         expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
//     });
// };

// export const generateRefreshToken = (payload: IpayloadJWT) => {
//     return jwt.sign(payload, REFRESH_TOKEN_SECRET as string, {
//         expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
//     });
// };

// export const verifyAccessToken = (token: string) => {
//     return jwt.verify(token, ACCESS_TOKEN_SECRET as string);
// };

// export const verifyRefreshToken = (token: string) => {
//     return jwt.verify(token, REFRESH_TOKEN_SECRET as string);
// };