import { Model, Types } from 'mongoose';
import { Users, UserModel } from '../models/user.model';
import { userResponse } from '../interfaces/user.interface';

class UserService {
    constructor(protected readonly userModel: Model<Users>) {}


    // ==================== Find All Users ====================
    findAll = async (query: Record<string, any> = {}, userID: string): Promise<userResponse<Users[]>> => {
        try {
            const isValidID: boolean | any = await this.checkID(userID);
            if (isValidID !== true) return isValidID;

            const users: any = await this.userModel.find({ ...query, _id: {$nin: [userID]} }).select('-__v -password');
            return { status: 200, users };
        } catch (error: any) {
            return { status: 500, error: "Internal Server Error" }
        }
    }


    // ==================== Find One User ====================
    findOne = async (id: string): Promise<userResponse<Users[]>> => {
        try {
            const isValidID: boolean | any = await this.checkID(id);
            if (isValidID !== true) return isValidID;

            const user: any = await this.userModel.findById(id).select('-__v -password');
            return { status: 200, user };
        } catch (error: any) {
            return { status: 500, error: "Internal Server Error" }
        }
    }


    // ==================== Mongo ID Validation ====================
    protected checkID = async (id: string): Promise<true | userResponse<null>> => {
        if (!Types.ObjectId.isValid(id)) return { status: 400, error: "Invalid user ID" };
        const existingUser: any = await this.userModel.exists({ _id: id });
        if (!existingUser) return { status: 404, error: "User not found" };
        return true
    }
}

export default new UserService(UserModel);