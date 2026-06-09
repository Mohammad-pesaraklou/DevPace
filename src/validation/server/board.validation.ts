import Joi, { object } from "joi";

export const BoardSchema = object({
  title: Joi.string().min(3).required(),
  settings: Joi.object(),
  stared: Joi.boolean(),
});
