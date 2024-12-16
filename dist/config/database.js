"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
// db connection imports
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_URL } = process.env;
// Check for required environment variables
if (!DB_URL) {
    throw new Error("Uri is missing in environment variable for connecting the db to the project.");
}
const dbUrl = process.env.DB_URL;
const dbConnection = async () => {
    try {
        // Starting establish DB connection
        await mongoose_1.default.connect(dbUrl);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(0);
        }
        else {
            console.error("An unknown error occurred during MongoDB connection.");
            process.exit(0);
        }
    }
};
exports.dbConnection = dbConnection;
