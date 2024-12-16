import Notification from "../models/notificationModel";
import { NotificationSaveTypes } from "../types/Common";

export const logNotification = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    //norification object type
    const norificationSaveObj: NotificationSaveTypes = {
      name,
      email,
      subject,
      message,
    };

    // Log the notification in the database
    const notification = await Notification.create(norificationSaveObj);
    return notification;
  } catch (error) {
    console.error("Error logging notification:", error);
    throw new Error("Failed to log notification");
  }
};
