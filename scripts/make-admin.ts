
// Script to make a user an admin
import { db } from "../server/storage";
import { users } from "../shared/schema";
import { eq } from "drizzle-orm";

async function makeAdmin(username: string) {
  try {
    const result = await db.update(users)
      .set({ isAdmin: true })
      .where(eq(users.username, username))
      .returning();
    
    if (result.length === 0) {
      console.error(`User ${username} not found`);
      process.exit(1);
    }
    
    console.log(`User ${username} is now an admin`);
    process.exit(0);
  } catch (error) {
    console.error('Failed to update user:', error);
    process.exit(1);
  }
}

// Get username from command line argument
const username = process.argv[2];
if (!username) {
  console.error('Please provide a username');
  console.error('Usage: npx tsx scripts/make-admin.ts <username>');
  process.exit(1);
}

makeAdmin(username);
