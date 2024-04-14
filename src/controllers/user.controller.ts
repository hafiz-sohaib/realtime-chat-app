import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserRequest } from '../interfaces/user.interface';
import fetch from 'node-fetch';

class UserController {
    constructor(protected readonly userService: any) {}


    getAllUsers = async (request: UserRequest, response: Response): Promise<any> => {
        const query: any = request.query || "";
        const userID: string = request.user._id
        const { status, ...result }: any = await this.userService.findAll(query, userID);
        response.status(status).json(result);
    }


    getOneUser = async (request: Request, response: Response): Promise<any> => {
        const id: string = request.params.id;
        const { status, ...result}: any = await this.userService.findOne(id);
        response.status(status).json(result);
    }


    getUserImage = async (request: Request, response: Response): Promise<any> => {
        try {
            const imgResponse: any = await fetch(`https://drive.google.com/uc?id=${request.params.imageID}`);
            if (!imgResponse.ok) return response.status(500).send('Image Fetching Failed');
            response.setHeader('Content-Type', imgResponse.headers.get('Content-Type'));
            imgResponse.body.pipe(response);
        } catch (error) {
            response.status(500).json({ error });
        }
    }
}

export default new UserController(UserService);