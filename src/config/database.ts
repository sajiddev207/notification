// db connection imports
require("dotenv").config();
import mongoose from "mongoose";

const { DB_URL } = process.env;

// Check for required environment variables
if (!DB_URL) {
  throw new Error(
    "Uri is missing in environment variable for connecting the db to the project."
  );
}

const dbUrl: string = process.env.DB_URL as string;

export const dbConnection = async () => {
  try {
    // Starting establish DB connection
    await mongoose.connect(dbUrl);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(0);
    } else {
      console.error("An unknown error occurred during MongoDB connection.");
      process.exit(0);
    }
  }
};
