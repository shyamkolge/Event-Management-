import bcrypt from "bcrypt";
import asyncHandler from "./asyncHandler.js";

const passwordHash = async (password) => {
  const passwordPassword = await bcrypt.hash(password, 10);
  return passwordPassword;
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { passwordHash, comparePassword };
