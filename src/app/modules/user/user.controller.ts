import { Request, Response } from 'express';
import { userServices } from './user.service';
import { User } from './user.model';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (await User.isUserExists(userId)) {
      const result = await userServices.getSingleUser(userId);

      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    if (await User.isUserExists(userId)) {
      const result = await userServices.deleteUser(userId);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (await User.isUserExists(userId)) {
      const result = await userServices.getUserOrders(userId);

      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};
const getTotalPriceofOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (await User.isUserExists(userId)) {
      const result = await userServices.getTotalPriceofOrder(userId);

      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: parseFloat(result?.toFixed(2) ?? '0.00'),
        },
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      data: error,
    });
  }
};

export const usercontroller = {
  getAllUsers,
  getSingleUser,
  deleteUser,
  getUserOrders,
  getTotalPriceofOrder,
};
