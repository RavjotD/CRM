
// Script to make a user an admin
import { storage } from "../server/storage.ts";

async function makeAdmin(username: string) {
  try {
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      console.error(`User ${username} not found`);
      process.exit(1);
    }
    
    const updatedUser = await storage.setAdminStatus(user.id, true);
    
    if (!updatedUser) {
      console.error(`Failed to update user ${username}`);
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
