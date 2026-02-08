import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

class ErrorMiddleware {
  public handleError = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    if (err.name === "ValidationError") {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    if (err.name === "MongoError" && (err as any).code === 11000) {
      return res.status(400).json({
        status: "error",
        message: "Duplicate field value entered",
      });
    }

    if (err.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Invalid ID format",
      });
    }

    console.error("ERROR:", err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  };
}

export default ErrorMiddleware;
