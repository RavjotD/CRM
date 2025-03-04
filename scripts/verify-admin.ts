
import { storage } from "../server/storage";
import { scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

async function verifyAdmin() {
  try {
    const username = "admin_ravjotD";
    const password = "Neymar.19!";
    
    // Check if user exists
    const user = await storage.getUserByUsername(username);
    
    if (!user) {
      console.log("Admin user not found. Please run the make-admin-fix.ts script first.");
      process.exit(1);
    }
    
    console.log(`Found user ${username} with ID: ${user.id}`);
    console.log(`Admin status: ${user.isAdmin ? "YES" : "NO"}`);
    
    // For security, we won't verify the password here, but you can use:
    // const passwordMatch = await comparePasswords(password, user.password);
    // console.log(`Password matches: ${passwordMatch ? "YES" : "NO"}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

verifyAdmin();
