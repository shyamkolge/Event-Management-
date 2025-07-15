import sql from "../db/connection.js";
import { asyncHandler, ApiResponce, ApiError } from "../utils/index.js";

const createEvent = asyncHandler(async (req, res, next) => {
  const { title, datetime, location, capacity } = req.body;

  if (capacity <= 0 || capacity > 1000) {
    return next(new ApiError(400, "Capacity must be between 1 and 1000"));
  }

  console.log(req.user.id);

  const [event] = await sql`
    INSERT INTO events (title, datetime, location, capacity , createdby)
    VALUES (${title}, ${datetime}, ${location}, ${capacity}, ${req.user.id})
    RETURNING id;
  `;

  res
    .status(201)
    .json(new ApiResponce(201, { eventId: event.id }, "Event created"));
});

export { createEvent };
