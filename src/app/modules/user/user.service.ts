import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: TUser) => {
    const { userId, username, fullName, age, email, isActive, hobbies, address } = await User.create(userData);
    const result = { userId, username, fullName, age, email, isActive, hobbies, address }
    return result;
};
const updateUser = async (id: string, userData: TUser) => {
    const result = await User.findOneAndUpdate({ userId: id }, userData, { new: true, runValidators: true });
    return result;
};
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
const addNewProduct = async (id: string, orderData: TOrder) => {
    const result = await User.findOneAndUpdate({ userId: id }, { $push: { orders: orderData } }, { new: true, runValidators: true });
    return result;
};

export const userServices = {
    createUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    getUserOrders,
    getTotalPriceofOrder,
    addNewProduct
};
