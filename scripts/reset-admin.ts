
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
    
    // Get all users and delete them (by recreating the users Map)
    const users = await storage.getAllUsers();
    console.log(`Found ${users.length} existing users, removing them all...`);
    
    // This is a hacky way to clear all users since we're using in-memory storage
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
    
    console.log(`Admin user created successfully with ID: ${adminUser.id}`);
    console.log("You can now log in with:");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

resetAndCreateAdmin();
