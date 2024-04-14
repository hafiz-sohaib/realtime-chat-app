import { Model, Types } from 'mongoose';
import { Users, UserModel } from '../models/user.model';
import { updateUser, updatePassword, userResponse } from '../interfaces/user.interface';


class ProfileService {
    constructor(protected readonly userModel: Model<Users>) {}


    // ==================== Get Profile ====================
    findOne = async (id: string): Promise<userResponse<Users[]>> => {
        try {
            const profile: any = await this.userModel.findById(id).select('-__v -password');
            return { status: 200, profile };
        } catch (error: any) {
            return { status: 500, error: "Internal Server Error" }
        }
    }


    // ==================== Update Profile ====================
    update = async (id: string, payload: updateUser): Promise<userResponse<Users[]>> => {
        try {
            const isValidID: boolean | any = await this.checkID(id);
            if (isValidID !== true) return isValidID;

            const profile: any = await this.userModel.findByIdAndUpdate(id, payload, {new: true}).select('-__v -password');
            return { status: 200, profile };
        } catch (error: any) {
            return { status: 500, error: "Internal Server Error" }
        }
    }


    // ==================== Update Password ====================
    updatePassword = async (id: string, payload: updatePassword): Promise<userResponse<Users>> => {
        try {
            const isValidID: boolean | any = await this.checkID(id);
            if (isValidID !== true) return isValidID;

            const profile: any = await this.userModel.findById(id);
            if (!await profile.matchPassword(payload.oldPassword)) return { status: 401, error: "Incorrect old Password" }
            if (payload.newPassword !== payload.confirmPassword) return { status: 401, error: "Passwords Doesn't Matched" }

            profile.password = payload.newPassword;
            await profile.save();

            return { status: 200, message: "Password Successfully Changed" };
        } catch (error: any) {
            return { status: 500, error: "Internal Server Error" }
        }
    }


    // ==================== Delete Profile ====================
    delete = async (id: string): Promise<userResponse<Users[]>> => {
        try {
            const isValidID: boolean | any = await this.checkID(id);
            if (isValidID !== true) return isValidID;

            await this.userModel.findByIdAndDelete(id);
            return { status: 200, message: "Profile Successfully Deleted" };
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

export default new ProfileService(UserModel);