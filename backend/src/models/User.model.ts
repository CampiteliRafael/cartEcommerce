import mongoose, { Schema, Document } from "mongoose";
import { CreateUserInput } from "../schemas/user.schema";

export interface UserDocument extends Omit<CreateUserInput, 'password'>, Document {
    password?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
}, { timestamps: true, });

const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;