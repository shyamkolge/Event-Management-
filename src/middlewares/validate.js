import { ApiError } from "../utils/index.js";

export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return next(new ApiError(400, messages.join(", ")));
  }

  next();
};

export default validate;
