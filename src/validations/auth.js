import { Joi, Segments } from 'celebrate';

export const registerValidation = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(5).required(),
  }),
};

export const loginValidation = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(5).required(),
  }),
};
