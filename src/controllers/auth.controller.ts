import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { signUp, signIn } from '../interfaces/user.interface';

class AuthController {
    constructor(protected readonly authService: any) {}


    signUp = async (request: Request, response: Response): Promise<any> => {
        const body: signUp = request.body;
        const { status, ...result }: any = await this.authService.create(body);
        response.status(status).json(result);
    }


    signIn = async (request: Request, response: Response): Promise<any> => {
        const body: signIn = request.body;
        const { status, ...result }: any = await this.authService.findOne(body);
        response.status(status).json(result);
    }
}

export default new AuthController(AuthService);