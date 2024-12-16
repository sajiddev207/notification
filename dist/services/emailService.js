"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailBySmtp2Go = void 0;
//import local files
const EmailHelpers_1 = require("../helpers/EmailHelpers");
// service function to send email using SMTP2Go
const sendEmailBySmtp2Go = async (subject, message) => {
    try {
        const response = await (0, EmailHelpers_1.sendEmailBySmtp2GOHelper)(subject, message);
        console.log(`Email sent :`, response?.messageId);
        return response;
    }
    catch (error) {
        console.error("Error sending email via SMTP2Go:", error);
        throw error;
    }
};
exports.sendEmailBySmtp2Go = sendEmailBySmtp2Go;
