// src/config/database.ts
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;

// Check for required environment variables
if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASS) {
  throw new Error(
    "Missing one or more required environment variables for database configuration."
  );
}

const sequelize: Sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST as string,
    dialect: "postgres",
    logging: false,
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit process with failure
  }
};

export { sequelize };
export default sequelize;
