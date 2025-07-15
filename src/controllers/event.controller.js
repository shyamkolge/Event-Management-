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

const getAllEventDetails = asyncHandler(async (req, res, next) => {
  const [event] = await sql`SELECT * FROM events`;
  if (!event) return next(new ApiError(404, "Event not found"));

  const users = await sql`
    SELECT u.id, u.name, u.email
    FROM event_registrations er
    JOIN users u ON er.user_id = u.id
  `;

  res.json(new ApiResponce(200, { ...event, registeredUsers: users }));
});

const registerForEvent = asyncHandler(async (req, res, next) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  const [event] = await sql`SELECT * FROM events WHERE id = ${eventId}`;
  if (!event) return next(new ApiError(404, "Event not found"));

  if (new Date(event.datetime) < new Date()) {
    return next(new ApiError(400, "Registrations are closed"));
  }

  const [{ count }] = await sql`
    SELECT COUNT(*)::int FROM event_registrations WHERE event_id = ${eventId};
  `;

  if (count >= event.capacity) {
    return next(new ApiError(400, "Registrations are full"));
  }

  const existing = await sql`
    SELECT * FROM event_registrations WHERE user_id = ${userId} AND event_id = ${eventId};
  `;
  if (existing.length) {
    return next(new ApiError(409, "User already registered"));
  }

  await sql`
    INSERT INTO event_registrations (user_id, event_id)
    VALUES (${userId}, ${eventId});
  `;

  res.json(new ApiResponce(200, null, "User registered successfully"));
});

const cancelRegistration = asyncHandler(async (req, res, next) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  const [user] =
    await sql`SELECT * FROM event_registrations WHERE user_id = ${userId} AND event_id = ${eventId}`;

  if (!user)
    return next(new ApiError(404, "You are not registered for this event"));

  await sql`
    DELETE FROM event_registrations
    WHERE user_id = ${userId} AND event_id = ${eventId}
  `;

  res.json(new ApiResponce(200, null, "Registration cancelled"));
});

export {
  createEvent,
  getAllEventDetails,
  getEventDetails,
  registerForEvent,
  cancelRegistration,
};
