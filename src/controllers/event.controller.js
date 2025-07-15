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

const getEventDetails = asyncHandler(async (req, res, next) => {
  const id = req.params.eventId;
  console.log(id);

  const [event] = await sql`SELECT * FROM events WHERE id = ${id}`;
  if (!event) return next(new ApiError(404, "Event not found"));

  const users = await sql`
    SELECT u.id, u.name, u.email
    FROM event_registrations er
    JOIN users u ON er.user_id = u.id
    WHERE er.event_id = ${id};
  `;

  res.json(new ApiResponce(200, { ...event, registeredUsers: users }));
});

export { createEvent, getEventDetails };
