import { Request, Response } from "express";

// import local files
import * as emailService from "../services/emailService";
import { apiResponse } from "../lib/ApiResponse";
import { logNotification } from "../helpers/logHelper";

// api to send email using SMTP2Go
export const sendEmailBySmtp2GO = async (req: Request, res: Response) => {
  const { successResponse, errorResponse } = apiResponse(res);
  try {
    //extract body data
    const { name, email, subject, message } = req.body;

    // Call the SMTP2Go service to send an email
    const serviceRes = await emailService.sendEmailBySmtp2Go(subject, message);

    // check for response of service
    if (!serviceRes) {
      return errorResponse({
        message: `Error comes while sending email`,
      });
    }

    // Log the notification and feed into audit log
    await logNotification(name, email, subject, message);

    return successResponse({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return errorResponse({ statusCode: 500, message: "Failed to send email" });
  }
};
