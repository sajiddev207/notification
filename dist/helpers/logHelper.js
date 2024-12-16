"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logNotification = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const logNotification = async (name, email, subject, message) => {
    try {
        //norification object type
        const norificationSaveObj = {
            name,
            email,
            subject,
            message,
        };
        // Log the notification in the database
        const notification = await notificationModel_1.default.create(norificationSaveObj);
        return notification;
    }
    catch (error) {
        console.error("Error logging notification:", error);
        throw new Error("Failed to log notification");
    }
};
exports.logNotification = logNotification;
