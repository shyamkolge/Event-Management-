import { loginUser, register, logout } from "../controllers/auth.controller.js";
import { Router } from "express";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), loginUser);
router.get("/logout", logout);

export default router;
