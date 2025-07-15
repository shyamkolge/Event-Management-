import Joi from "joi";

export const createEventSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  datetime: Joi.date().iso().greater("now").required(),
  location: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().integer().min(1).max(1000).required(),
});
