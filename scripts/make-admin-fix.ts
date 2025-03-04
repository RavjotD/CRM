
// Simple script to manually create an admin user
import { storage } from "../server/storage";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function createAdminUser() {
  try {
    // Admin credentials
    const username = "admin_ravjotD";
    const password = "Neymar.19!";
    const hashedPassword = await hashPassword(password);
    
    console.log("Checking for existing admin user...");
    
    // Check if user exists
    let user = await storage.getUserByUsername(username);

    if (!user) {
      console.log(`User ${username} not found. Creating new admin user...`);
      // Create a new user with admin privileges
      user = await storage.createUser({
        username: username,
        password: hashedPassword,
        isAdmin: true,
      });
      console.log(`Admin user created with ID: ${user.id}`);
    } else {
      console.log(`User ${username} found with ID: ${user.id}. Updating password and admin status...`);
      
      // Update password and ensure admin status
      const updatedUser = await storage.setUserData(user.id, {
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log(`User ${username} updated with admin privileges.`);
    }

    console.log("Admin creation/update completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createAdminUser();
