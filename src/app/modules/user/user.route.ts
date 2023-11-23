import express from 'express';
import { usercontroller } from './user.controller';

const router = express.Router();
router.get('/', usercontroller.getAllUsers);
router.post('/', usercontroller.createUser);
router.get('/:userId', usercontroller.getSingleUser);
router.delete('/:userId', usercontroller.deleteUser);
router.get('/:userId/orders/total-price', usercontroller.getTotalPriceofOrder);
router.get('/:userId/orders', usercontroller.getUserOrders);
router.put('/:userId/orders', usercontroller.addNewProduct);
router.put('/:userId', usercontroller.updateUser);
export const userRoutes = router;
