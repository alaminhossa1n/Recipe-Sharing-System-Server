import { NextFunction, Request, Response } from "express";
import { countryServices } from "./country.service";

const createCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await countryServices.createCountryIntoDB(req.body);
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

const getAllCountry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await countryServices.getAllCountryFromDB();
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

export const countryController = {
  createCountry,
  getAllCountry,
};
