import { Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt.helper';
import { AuthRequest } from '../interfaces/user.interface';

export default function authGuard(request: AuthRequest, response: Response, next: NextFunction) {
    try {
        const authHeader: any = request.headers?.authorization;
        if (!authHeader) return response.status(401).send({ error: 'Authorization header is missing' });

        const tokenParts: string[] = authHeader.split(' ');
        if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') return response.status(401).json({ error: 'Invalid bearer token format' });

        const token: string = tokenParts[1];
        const decoded: any = verifyToken(token)
        if (decoded?.user) {
            request['user'] = decoded.user;
            return next();
        }
    } catch (error) {
        response.status(401).json({ error: 'Token expired. Please SignIn and try again' });
    }
}