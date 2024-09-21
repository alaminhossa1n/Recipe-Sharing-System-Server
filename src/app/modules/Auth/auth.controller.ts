import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.signInToDB(req.body);
    // Check if `result.success` is `false`, indicating a failure at the service level
    if (result.success === false) {
      res.status(result.statusCode).json({
        success: false,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    } else {
      // Successful response
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User signed in successfully",
        data: result,
      });
    }
  } catch (err) {
    next(err); // Let the error handling middleware deal with it
  }
};

const googleSigIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.googleSinInToDB(req.body);
    // Check if `result.success` is `false`, indicating a failure at the service level
    if (result.success === false) {
      res.status(result.statusCode).json({
        success: false,
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      });
    } else {
      // Successful response
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "User signed in successfully",
        data: result.data,
      });
    }
  } catch (err) {
    next(err); // Let the error handling middleware deal with it
  }
};

export const authController = {
  signIn,
  googleSigIn
};
