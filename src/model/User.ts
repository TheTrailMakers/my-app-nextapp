import mongoose, {Schema, Document} from "mongoose";
import { boolean } from "zod";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAdmin: boolean;
    createdAt: Date
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Username Required'],
        trim: true,
        unique: true,
    },

    email: {
        type: String,
        required: [true, 'Email Required'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'not a valid email format']
    },

    password: {
        type: String,
        required: [true, 'Password Required']
    },

    verifyCode: {
        type: String,
        required: [true, 'VerifyCode Required']
    },

    verifyCodeExpiry: {
        type: Date,
        required: [true, 'VerifyCodeExpiry  Required']
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default UserModel