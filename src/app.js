import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send(process.env.PORT);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "126kb" }));

app.use("/api/v1/auth", authRouter);

export default app;
