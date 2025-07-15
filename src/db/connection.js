import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

let sql;

try {
  const connectionString = process.env.DATABASE_URL;
  console.log(connectionString);
  sql = postgres(connectionString);
  console.log("Connected to Supabase Postgres");
} catch (error) {
  console.error("Error while connecting to the database:", error);
}

export default sql;
