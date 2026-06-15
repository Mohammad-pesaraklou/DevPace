import Joi from "joi";

export const BoardSchema = Joi.object({
  title: Joi.string().min(3).required(),
  settings: Joi.object(),
  stared: Joi.boolean(),
});
