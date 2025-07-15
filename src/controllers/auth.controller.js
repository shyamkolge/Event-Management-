import sql from "../db/connection.js";
import { asyncHandler, ApiError, ApiResponce } from "../utils/index.js";

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existedUser = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (existedUser.length) {
    return next(new ApiError(400, "User already exists"));
  }

  const event =
    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;

  console.log(event);

  res.send("User registered successfully");
});

export { register };
