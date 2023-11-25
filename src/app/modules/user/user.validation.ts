import Joi from 'joi';

const fullNameSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});
export const orderSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: fullNameSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchema.required(),
  orders: Joi.array().items(orderSchema),
});

export const updateValidationSchema = Joi.object({
  userId: Joi.number().optional(),
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  fullName: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
  }).optional(),
  age: Joi.number().min(0).optional(),
  email: Joi.string().email().optional(),
  isActive: Joi.boolean().optional(),
  hobbies: Joi.array().items(Joi.string()).optional(),
  address: Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
  }).optional(),
});

export default userValidationSchema;
