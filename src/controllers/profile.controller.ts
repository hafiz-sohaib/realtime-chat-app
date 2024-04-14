import { Response } from 'express';
import ProfileService from '../services/profile.service';
import UploadFileOnCloud from '../helpers/fileUpload.helper';
import { updateUser, updatePassword, UserRequest } from '../interfaces/user.interface';


class ProfileController {
    constructor(protected readonly profileService: any) {}


    getProfile = async (request: UserRequest, response: Response): Promise<any> => {
        const id: string = request.user._id;
        const { status, ...result }: any = await this.profileService.findOne(id);
        response.status(status).json(result);
    }


    updateProfile = async (request: UserRequest, response: Response): Promise<any> => {
        const payload: updateUser = { ...request.body };
        const id: string = request?.user._id;
        const files: any = request?.files?.image[0];

        if (files) {
            const uploadedImg: any = await UploadFileOnCloud(files?.path, files?.filename);
            payload['image'] = uploadedImg?.id;
        }

        const { status, ...result }: any = await this.profileService.update(id, payload);
        response.status(status).json(result);
    }


    updatePassword = async (request: UserRequest, response: Response): Promise<any> => {
        const payload: updatePassword = { ...request.body };
        const id: string = request?.user._id;

        const { status, ...result }: any = await this.profileService.updatePassword(id, payload);
        response.status(status).json(result);
    }


    deleteProfile = async (request: UserRequest, response: Response): Promise<any> => {
        const id: string = request?.user._id;
        const { status, ...result }: any = await this.profileService.delete(id);
        response.status(status).json(result);
    }
}

export default new ProfileController(ProfileService);