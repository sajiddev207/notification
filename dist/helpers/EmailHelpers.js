"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailBySmtp2GOHelper = void 0;
const nodemailerSMTP = require("nodemailer");
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
const sendEmailBySmtp2GOHelper = async (subject, message) => {
    try {
        const mailOptions = {
            from: process.env.SMTP2GO_USER, // Sender address (must be verified in SMTP2Go)
            to: process.env.SMTP2GO_RECEIVER, // List of recipients
            subject: subject, // Subject line
            text: message, // Plain text message
        };
        const response = await transporterSmtp2Go.sendMail(mailOptions);
        return response;
    }
    catch (error) {
        console.error("Error sending email via SMTP2Go:", error);
        throw error;
    }
};
exports.sendEmailBySmtp2GOHelper = sendEmailBySmtp2GOHelper;
