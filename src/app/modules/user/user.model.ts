import { Schema, model } from 'mongoose';
import {
  TUser,
  TFullName,
  TAddress,
  TOrder,
  UserModel,
} from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
const addressSchema = new Schema<TAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    type: fullNameSchema,
    required: true,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String }],
  address: {
    type: addressSchema,
    required: true,
  },
  orders: [
    {
      type: orderSchema,
    },
  ],
});
// pre hook for query middleware
userSchema.pre('find', function (next) {
  this.find().select(
    'username fullName.firstName fullName.lastName age email address.street address.city address.country -_id',
  );
  next();
});

userSchema.pre('findOne', function (next) {
  this.find().select(
    'userId username fullName.firstName fullName.lastName age email isActive hobbies address.street address.city address.country -_id',
  );
  next();
});

// custom static methos to check user existance
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// create a Model
export const User = model<TUser, UserModel>('User', userSchema);
