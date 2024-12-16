"use strict";
// middlewares for validate req.body
Object.defineProperty(exports, "__esModule", { value: true });
const validateBody = (schema) => {
    return (req, res, next) => {
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
exports.default = validateBody;
