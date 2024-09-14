import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.createUserInToDB(req.body);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "User Created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.query.email as string;

    const result = await UserServices.getSingleUserFromDB(email);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const buyCoin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserServices.buyCoinIntoDB(req.body);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Coin Buy successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
  getSingleUser,
  buyCoin,
};
