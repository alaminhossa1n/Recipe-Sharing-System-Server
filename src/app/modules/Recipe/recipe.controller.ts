import { NextFunction, Request, Response } from "express";
import { RecipeServices } from "./recipe.service";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await RecipeServices.createRecipeInToDB(req.body);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Recipe Created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const RecipeController = {
  createRecipe,
};
