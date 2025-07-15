import { Router } from "express";
import {
  createEvent,
  getAllEventDetails,
  getEventDetails,
  registerForEvent,
  cancelRegistration,
  getUpCommingEvents,
  getEventStats,
} from "../controllers/event.controller.js";
import validate from "../middlewares/validate.js";
import { createEventSchema } from "../validators/event.validator.js";

const router = Router();

router.post("/create", validate(createEventSchema), createEvent);
router.get("/getAllEventDetails", getAllEventDetails);
router.get("/getEventDetails/:eventId", getEventDetails);
router.post("/:eventId/register", registerForEvent);
router.get("/:eventId/cancel", cancelRegistration);
router.get("/upcomingEvents", getUpCommingEvents);
router.get("/stats/:eventId", getEventStats);

export default router;
