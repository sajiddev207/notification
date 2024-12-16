//import local files
import { sendEmailBySmtp2GOHelper } from "../helpers/EmailHelpers";

// service function to send email using SMTP2Go
export const sendEmailBySmtp2Go = async (subject: string, message: string) => {
  try {
    const response = await sendEmailBySmtp2GOHelper(subject, message);
    console.log(`Email sent :`, response?.messageId);

    return response;
  } catch (error) {
    console.error("Error sending email via SMTP2Go:", error);
    throw error;
  }
};
