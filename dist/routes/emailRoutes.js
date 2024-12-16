"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import local files
const emailController_1 = require("../controllers/emailController");
const JoiValidator_1 = __importDefault(require("../middlewares/JoiValidator"));
const EmailSchema_1 = require("../schemas/EmailSchema");
const router = express_1.default.Router();
// sent by smtp2go
router.post("/sent", (0, JoiValidator_1.default)(EmailSchema_1.nodemailerEmailSchema), emailController_1.sendEmailBySmtp2GO);
exports.default = router;
