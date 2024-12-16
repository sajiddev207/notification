import express from "express";

// import local files
import { sendEmailBySmtp2GO } from "../controllers/emailController";
import validateBody from "../middlewares/JoiValidator";
import { nodemailerEmailSchema } from "../schemas/EmailSchema";

const router = express.Router();

// sent by smtp2go
router.post("/sent", validateBody(nodemailerEmailSchema), sendEmailBySmtp2GO);

export default router;
