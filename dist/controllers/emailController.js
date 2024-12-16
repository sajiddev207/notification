"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailBySmtp2GO = void 0;
// import local files
const emailService = __importStar(require("../services/emailService"));
const ApiResponse_1 = require("../lib/ApiResponse");
const logHelper_1 = require("../helpers/logHelper");
// api to send email using SMTP2Go
const sendEmailBySmtp2GO = async (req, res) => {
    const { successResponse, errorResponse } = (0, ApiResponse_1.apiResponse)(res);
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
        await (0, logHelper_1.logNotification)(name, email, subject, message);
        return successResponse({
            message: "Email sent successfully",
        });
    }
    catch (error) {
        console.error("Error sending email:", error);
        return errorResponse({ statusCode: 500, message: "Failed to send email" });
    }
};
exports.sendEmailBySmtp2GO = sendEmailBySmtp2GO;
