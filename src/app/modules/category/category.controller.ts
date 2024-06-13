import { NextFunction, Request, Response } from "express";
import { categoryServices } from "./category.service";

const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await categoryServices.createCategoryIntoDB(req.body);
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Category Created successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  };


const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await categoryServices.getAllCategoryFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Category Retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};




export const categoryController = {
  createCategory,
  getAllCategory
};
