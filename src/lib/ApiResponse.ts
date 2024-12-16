import { Request, Response, NextFunction } from "express"

export const apiResponse = (response: Response) => {
  const successResponse = async (data: any) => {
    const statusCode: number = data.statusCode ?? 200

    response.status(statusCode).json({
      success: true,
      status: statusCode,
      ...data,
    })
  }

  const errorResponse = async (data: any) => {
    const statusCode: number = data.statusCode ?? 422

    if (!data.errorCode) {
      switch (statusCode) {
        case 400:
          data.errorCode = "unexpected_error"
          break
        case 401:
          data.errorCode = "unauthorized"
          break
        case 403:
          data.errorCode = "not_enough_permissions"
          break
        case 404:
          data.errorCode = "not_found"
          break
        default:
          data.errorCode = "internal_server_error"
          break
      }
    }

    response.status(statusCode).json({
      success: false,
      status: statusCode,
      message: data?.message,
      code: data.errorCode,
    })
  }

  return {
    successResponse,
    errorResponse,
  }
}
