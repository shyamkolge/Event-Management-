import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import isLoggedIn from "./middlewares/isLoggedIn.js";
import cookieParser from "cookie-parser";
import eventRouter from "./routes/event.routes.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import YAML from "yamljs";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// Dotenv Configuration
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();

// Global Middlewares
// Sets the Security HTTP Headers
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "126kb" }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTTP Logger
app.use(morgan("combined"));

// View Engine Setup
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Event Management API",
    description: "API for managing events, users, and registrations.",
  });
});

// API Documentation
// __dirname workaround for ES Modules
// Load the YAML file
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth Routes
app.use("/api/v1/auth", authRouter);

// Event Routes
app.use("/api/v1/event", isLoggedIn, eventRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
