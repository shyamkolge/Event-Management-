import sql from "../db/connection.js";
import { asyncHandler, ApiError, ApiResponce } from "../utils/index.js";
import { passwordHash, comparePassword } from "../utils/passwordHash.js";
import jwt from "jsonwebtoken";

const createSendToken = async (user, statusCode, message, res) => {
  const token = await jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: "success",
    token,
    message,
    data: user,
  });
};

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existedUser = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (existedUser.length) {
    return next(new ApiError(400, "User already exists"));
  }

  const hashedPassword = await passwordHash(password);
  const [user] =
    await sql`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${hashedPassword}) RETURNING *`;

  createSendToken(user, 201, "User created successfully", res);
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (!user) {
    return next(new ApiError(400, "User not found"));
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    return next(new ApiError(400, "Password is incorrect"));
  }

  const [loggedInUser] =
    await sql`SELECT id , name , email, created_at FROM users WHERE email = ${email}`;

  createSendToken(loggedInUser, 200, "User logged in successfully", res);
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).clearCookie("token").send("User log out successfully");
});

export { register, loginUser, logout };
