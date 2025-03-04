import { defineConfig } from "drizzle-kit";

// Update DATABASE_URL environment variable to point to Replit's PostgreSQL database.
// Example:  DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>

// Check if DATABASE_URL is set. If not, throw an error.  This is crucial for preventing runtime errors.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable not set. Please configure your Replit database and set the DATABASE_URL environment variable.");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});