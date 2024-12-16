const nodemailerSMTP = require("nodemailer");

//import local files
import { Smtp2GoEmailFormat } from "../types/EmailSendingTypes";

// A transporter object using the SMTP2Go details
const transporterSmtp2Go = nodemailerSMTP.createTransport({
  host: process.env.SMTP2GO_HOST,
  port: process.env.SMTP2GO_PORT,
  auth: {
    user: process.env.SMTP2GO_USER,
    pass: process.env.SMTP2GO_PASS,
  },
});

// helper function to send email using SMTP2Go
export const sendEmailBySmtp2GOHelper = async (
  subject: string,
  message: string
) => {
  try {
    const mailOptions: Smtp2GoEmailFormat = {
      from: process.env.SMTP2GO_USER as string, // Sender address (must be verified in SMTP2Go)
      to: process.env.SMTP2GO_RECEIVER as string, // List of recipients
      subject: subject, // Subject line
      text: message, // Plain text message
    };
    const response = await transporterSmtp2Go.sendMail(mailOptions);

    return response;
  } catch (error) {
    console.error("Error sending email via SMTP2Go:", error);
    throw error;
  }
};
