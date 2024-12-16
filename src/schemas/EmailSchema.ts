import Joi from "joi";

// send sms by aws
export const nodemailerEmailSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      tlds: { allow: true },
    })
    .required()
    .messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Invalid email format",
    }),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});
