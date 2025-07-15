import {
  createEvent,
  getEventDetails,
} from "../controllers/event.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create", createEvent);
router.get("/getEventDetails/:eventId", getEventDetails);

export default router;
