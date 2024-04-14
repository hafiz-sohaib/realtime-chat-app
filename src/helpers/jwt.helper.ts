import jwt from 'jsonwebtoken';
import globalConstants from '../config/constants';

export const generateToken = (payload: any) => {
    return jwt.sign(payload, globalConstants.JWT_SECRET, {expiresIn: '1d'})
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, globalConstants.JWT_SECRET)
}