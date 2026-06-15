import Joi from "joi";
import { AUTH_MESSAGES } from "../messages/auth.messages";

const loginValidateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .message(AUTH_MESSAGES.MIN_CHAR_PASS)
    .max(28)
    .message(AUTH_MESSAGES.MAX_CHAR_PASS)
    .required(),
});

export { loginValidateSchema };
