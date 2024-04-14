import { Document, Schema, model, Model } from 'mongoose';
import { isEmail, isStrongPassword } from 'validator';
import bcrypt from 'bcrypt';


export interface Users extends Document {
    fullName: string,
    email: string,
    password: string,
    image: string,
    isOnline: boolean,
    matchPassword(password: string): Promise<boolean>
}


export const UserSchema: Schema = new Schema<Users>(
    {
        fullName: {
            type: String,
            minlength: [3, "Full Name must be atleast 3 characters long"],
            maxlength: [12, "Full Name maximum 12 characters long"],
            validate: {
                validator: (value: string) => /^[A-Za-z\s]+$/.test(value),
                message: "Only alphabetic characters are allowed"
            }
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            immutable: true,
            validate: [isEmail, "Email must be valid"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: [isStrongPassword, "Password is too weak"]
        },
        image: {
            type: String
        },
        isOnline: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre<Users>('save', async function (next): Promise<any> {
    const salt: any = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}


export const UserModel: Model<Users> = model<Users>("users", UserSchema);