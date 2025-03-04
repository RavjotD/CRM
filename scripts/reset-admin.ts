
import { storage } from "../server/storage";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function resetAndCreateAdmin() {
  try {
    // Admin credentials
    const username = "admin_ravjotD";
    const password = "Neymar.19!";
    
    console.log("Clearing all existing users...");
    
    // Get all users first for logging
    const users = await storage.getAllUsers();
    console.log(`Found ${users.length} existing users, removing them all...`);
    
    // Clear the users map in storage
    // @ts-ignore - accessing private property
    storage.users = new Map();
    
    console.log("All users deleted.");
    
    // Create the new admin user
    console.log(`Creating new admin user: ${username}`);
    const hashedPassword = await hashPassword(password);
    
    const adminUser = await storage.createUser({
      username: username,
      password: hashedPassword,
      isAdmin: true,
    });
    
    // Verify the user was created
    const verifyUser = await storage.getUserByUsername(username);
    if (!verifyUser) {
      console.error("Failed to create admin user!");
      process.exit(1);
    }
    
    console.log(`Admin user created successfully with ID: ${adminUser.id}`);
    console.log(`Admin status: ${verifyUser.isAdmin ? "YES" : "NO"}`);
    console.log("You can now log in with:");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    // Return success
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

resetAndCreateAdmin();
