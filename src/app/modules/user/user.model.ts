import { Schema, model } from "mongoose";
import { TUser, TFullName, TAddress } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})
const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})
const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: {
        type: fullNameSchema,
        required: true
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String }],
    address: {
        type: addressSchema,
        required: true
    },
})

// create a Model
export const User = model<TUser>('User', userSchema);
