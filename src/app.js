import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";
import cookieParser from "cookie-parser";
import eventRouter from "./routes/event.routes.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "126kb" }));
app.use(cookieParser());

app.get("/", isLoggedIn, (req, res) => {
  res.send(process.env.PORT);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/event", isLoggedIn, eventRouter);

export default app;
