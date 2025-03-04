
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function makeAdminDirect() {
  // Connect to the database directly
  const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres";
  const client = postgres(connectionString);
  const db = drizzle(client);
  
  try {
    // Find the user with the username admin_ravjotD
    const adminUser = await db.select().from(users).where(eq(users.username, "admin_ravjotD"));
    
    if (adminUser.length === 0) {
      console.error(`User admin_ravjotD not found`);
      process.exit(1);
    }
    
    // Update the user to be an admin
    const [updated] = await db
      .update(users)
      .set({ isAdmin: true })
      .where(eq(users.id, adminUser[0].id))
      .returning();
    
    console.log(`User admin_ravjotD (ID: ${updated.id}) is now an admin`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to update user:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

makeAdminDirect();
