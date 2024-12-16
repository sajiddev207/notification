// middlewares for validate req.body

import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: true });

    if (error) {
      res.status(400).json({
        message: error.details[0].message.replace(/\"/g, ""),
        success: false,
        code: "not_found",
      });
      return;
    }
    next();
  };
};

export default validateBody;
