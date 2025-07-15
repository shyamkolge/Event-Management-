import { createEvent } from "../controllers/event.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create", createEvent);

export default router;
