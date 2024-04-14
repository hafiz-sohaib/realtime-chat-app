import { Document, Schema, model, Model } from 'mongoose';
import { isMongoId } from 'validator';

export interface Chats extends Document {
    sender: Schema.Types.ObjectId,
    receiver: Schema.Types.ObjectId,
    message: string
}

export const ChatSchema: Schema = new Schema<Chats>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "Sender ID is required"],
            validate: [isMongoId, "Invalid sender ID"]
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: [true, "Receiver ID is required"],
            validate: [isMongoId, "Invalid receiver ID"]
        },
        message: {
            type: String,
            required: [true, "Message is required"]
        },
    },
    {
        timestamps: true
    }
)

export const ChatModel: Model<Chats> = model<Chats>("chats", ChatSchema);