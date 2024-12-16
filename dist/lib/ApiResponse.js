"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
const apiResponse = (response) => {
    const successResponse = async (data) => {
        const statusCode = data.statusCode ?? 200;
        response.status(statusCode).json({
            success: true,
            status: statusCode,
            ...data,
        });
    };
    const errorResponse = async (data) => {
        const statusCode = data.statusCode ?? 422;
        if (!data.errorCode) {
            switch (statusCode) {
                case 400:
                    data.errorCode = "unexpected_error";
                    break;
                case 401:
                    data.errorCode = "unauthorized";
                    break;
                case 403:
                    data.errorCode = "not_enough_permissions";
                    break;
                case 404:
                    data.errorCode = "not_found";
                    break;
                default:
                    data.errorCode = "internal_server_error";
                    break;
            }
        }
        response.status(statusCode).json({
            success: false,
            status: statusCode,
            message: data?.message,
            code: data.errorCode,
        });
    };
    return {
        successResponse,
        errorResponse,
    };
};
exports.apiResponse = apiResponse;
