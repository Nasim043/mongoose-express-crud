import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TUser,
  TFullName,
  TAddress,
  TOrder,
  UserModel,
} from './user.interface';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { _id: false },
);

const addressSchema = new Schema<TAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<TOrder>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
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
//pre hook from document middleware
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
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

// custom static methods to check user existance
userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

// create a Model
export const User = model<TUser, UserModel>('User', userSchema);
