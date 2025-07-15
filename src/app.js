import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRouter from "./routes/auth.routes.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";
import cookieParser from "cookie-parser";
import eventRouter from "./routes/event.routes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import YAML from "yamljs";
import helmet from "helmet";

// Dotenv Configuration
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();

// Global Middlewares
// Sets the Security HTTP Headers
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "126kb" }));
app.use(cookieParser());

const limiter = rateLimit({
  max: 2,
  windowMs: 60 * 60 * 1000,
  message: "To many requiest from this IP, please try again after an hour",
});

app.use("", limiter);

// HTTP Logger
app.use(morgan("combined"));

// API Documentation
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth Routes
app.use("/api/v1/auth", authRouter);

// Event Routes
app.use("/api/v1/event", isLoggedIn, eventRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
