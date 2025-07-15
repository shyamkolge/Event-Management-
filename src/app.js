import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";
import cookieParser from "cookie-parser";
import eventRouter from "./routes/event.routes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

const app = express();

import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "126kb" }));
app.use(cookieParser());

app.get("/", isLoggedIn, (req, res) => {
  res.send(process.env.PORT);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/event", isLoggedIn, eventRouter);

app.use(globalErrorHandler);

export default app;
