// script to run for refreshing userbase
import { storage } from "../server/storage";

async function clearAllUsers() {
  try {
    // Clear the users map in storage
    // @ts-ignore - accessing private property
    storage.users = new Map();
    
    console.log("All users have been cleared.");
    console.log("The system will now create users automatically when they log in.");
    console.log("Just use any username and password combination to log in.");
    
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

clearAllUsers();
