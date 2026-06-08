import Joi from "joi";

/**
 * @desc Register Validation Schema
 */
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Valid email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

/**
 * @desc Login Validation Schema
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Valid email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});