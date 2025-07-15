import express, { urlencoded } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "126kb" }));

app.get("/", (req, res, next) => {
  res.send("Hello");
});

export default app;
