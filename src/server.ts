require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";

// import local files
import { connectDatabase, sequelize } from "./config/database";

//import routes
import emailRoutes from "./routes/emailRoutes";

// make app
const app: Application = express();

//extract port
const port: number = parseInt(process.env.PORT || "3002");

// body-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// cors validation
app.use(
  cors({
    origin: process.env.ORIGIN_URL as string,
  })
);

// routes
app.use("/api/email", emailRoutes);

app.listen(port, async () => {
  // Connect to the database
  await connectDatabase();
  console.log("Connected to the database.");

  // Sync all models with the database
  await sequelize.sync({ alter: true });
  console.log("All models were synchronized successfully.");
  console.log(`Notification service running on port ${port}`);
});
