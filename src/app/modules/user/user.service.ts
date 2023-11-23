import { User } from './user.model';

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};
const getSingleUser = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};
const deleteUser = async (userId: string) => {
  const result = await User.deleteOne({ userId });
  return result;
};
const getUserOrders = async (userId: string) => {
  const result = await User.findOne({ userId }).select('-orders._id');
  const userOrders = result?.orders;
  return userOrders;
};
const getTotalPriceofOrder = async (userId: string) => {
  const result = await User.findOne({ userId }).select('-orders._id');
  const userOrders = result?.orders;
  const totalPrice = userOrders?.reduce(
    (accumulator, item) => (accumulator += item.price * item.quantity),
    0,
  );
  return totalPrice;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  getUserOrders,
  getTotalPriceofOrder,
};
