import { Model } from 'mongoose';
import { Users, UserModel } from '../models/user.model';
import { signUp, signIn, userResponse } from '../interfaces/user.interface';
import { handleMongooseValidation } from '../helpers/mongooseError.helper';
import { generateToken } from '../helpers/jwt.helper';

class AuthService {
    constructor(protected readonly userModel: Model<Users>) {}


    // ==================== Create User ====================
    create = async (body: signUp): Promise<userResponse<Users[]>> => {
        try {
            const user: any = await this.userModel.create(body);
            return { status: 200, user };
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                return { status: 422, error: handleMongooseValidation(error, "users") };
            } else {
                return { status: 500, error: "Internal Server Error" };
            }
        }
    }


    // ==================== Find One User ====================
    findOne = async (body: signIn): Promise<userResponse<Users[]>> => {
        try {
            const user: any = await this.userModel.findOne({email: body?.email});
            if (!user || !(await user.matchPassword(body?.password))) return { status: 500, error: "Invalid Credentials" };
            const token: string = generateToken({ user });
            return { status: 200, accessToken: token };
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                return { status: 422, error: handleMongooseValidation(error, "users") };
            } else {
                return { status: 500, error: "Internal Server Error" };
            }
        }
    }
}

export default new AuthService(UserModel);