import jwt from "jsonwebtoken";
import { ApiError, asyncHandler } from "../utils/index.js";
import { promisify } from "util";
import sql from "../db/connection.js";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.token;

  if (!accessToken) return next(new ApiError(401, "You are not logged in"));

  try {
    const result = await promisify(jwt.verify)(
      accessToken,
      process.env.JWT_SECRET
    );

    if (!result) {
      return next(new ApiError(401, "Invalid Access Token"));
    }

    const [user] = await sql`select * from users where id = ${result.id}`;

    if (!user) {
      return next(new ApiError(401, "User not found with the token"));
    }

    // if (user.isPasswordChangedAfterJWT(result.iat)) {
    //   return next(new ApiError(401, "User recently changed password"));
    // }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in isLoggedIn middleware : ", error);
  }
});

export default isLoggedIn;
