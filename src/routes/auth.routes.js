import { loginUser, register, logout } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", logout);

export default router;
