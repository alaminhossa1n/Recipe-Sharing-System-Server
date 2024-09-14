import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";


const signIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const result = await authService.signInToDB(req.body);
        res.status(200).json({
          success: true,
          statusCode: 201,
          message: "User Sign in successfully",
          data: result,
        });
      } catch (err) {
        next(err);
      }
};

export const authController = {
  signIn,
};
