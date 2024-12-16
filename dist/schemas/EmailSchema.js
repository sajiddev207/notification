"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerEmailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// send sms by aws
exports.nodemailerEmailSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email({
        tlds: { allow: true },
    })
        .required()
        .messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Invalid email format",
    }),
    subject: joi_1.default.string().required(),
    message: joi_1.default.string().required(),
});
