"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import local files
const database_1 = require("./config/database");
//import routes
const emailRoutes_1 = __importDefault(require("./routes/emailRoutes"));
// make app
const app = (0, express_1.default)();
//extract port
const port = parseInt(process.env.PORT || "3002");
// body-parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// cors validation
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN_URL,
}));
// routes
app.use("/api/email", emailRoutes_1.default);
app.listen(port, async () => {
    // Connect to the database
    await (0, database_1.dbConnection)();
    console.log("Connected to the database.");
    console.log(`Notification service running on port ${port}`);
});
