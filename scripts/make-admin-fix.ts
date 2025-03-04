// Simple script to manually create an admin user
import { storage } from "../server/storage";

async function createAdminUser() {
  try {
    // Check if user exists
    let user = await storage.getUserByUsername("admin_ravjotD");

    if (!user) {
      console.log("User admin_ravjotD not found. Creating new admin user...");
      // Create a new user with admin privileges
      user = await storage.createUser({
        username: "admin_ravjotD",
        password: "Neymar.19!", // Default password you should change after login
        isAdmin: true,
      });
      console.log(`Admin user created with ID: ${user.id}`);
    } else {
      console.log(
        `User admin_ravjotD found with ID: ${user.id}. Setting as admin...`,
      );
      // Update existing user to be admin
      user = await storage.setAdminStatus(user.id, true);
      console.log(`User admin_ravjotD is now an admin`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

createAdminUser();
