import { Request, Response } from 'express';
import { userServices } from './user.service';
import { User } from './user.model';
import userValidationSchema, {
  orderSchema,
  updateValidationSchema,
} from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { value, error } = userValidationSchema.validate(userData);
    if (error) {
      // 422 Unprocessable Entity
      res.status(422).json({
        success: false,
        message: 'Validation Error',
        error: {
          code: 404,
          description: error.details[0].message,
        },
      });
    } else {
      const result = await userServices.createUser(value);
      res.status(200).json({
        success: true,
        message: 'User created successfully!',
        data: result,
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
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    if (await User.isUserExists(userId)) {
      const { value, error } = updateValidationSchema.validate(userData);

      if (error) {
        // 422 Unprocessable Entity
        res.status(422).json({
          success: false,
          message: 'Validation Error',
          error: {
            code: 404,
            description: error.details[0].message,
          },
        });
      } else {
        const result = await userServices.updateUser(userId, value);
        res.status(200).json({
          success: true,
          message: 'User updated successfully!',
          data: result,
        });
      }
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
      await userServices.deleteUser(userId);

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
        data: {
          orders: result,
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
const addNewProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;

    if (await User.isUserExists(userId)) {
      const { value, error } = orderSchema.validate(orderData);

      if (error) {
        // 422 Unprocessable Entity
        res.status(422).json({
          success: false,
          message: 'Validation Error',
          error: {
            code: 404,
            description: error.details[0].message,
          },
        });
      } else {
        await userServices.addNewProduct(userId, value);
        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: null,
        });
      }
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
  createUser,
  updateUser,
  addNewProduct,
};
