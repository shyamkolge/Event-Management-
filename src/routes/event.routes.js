import {
  createEvent,
  getAllEventDetails,
  getEventDetails,
  registerForEvent,
  cancelRegistration,
} from "../controllers/event.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create", createEvent);
router.get("/getAllEventDetails", getAllEventDetails);
router.get("/getEventDetails/:eventId", getEventDetails);
router.post("/:eventId/register", registerForEvent);
router.get("/:eventId/cancel", cancelRegistration);

export default router;
