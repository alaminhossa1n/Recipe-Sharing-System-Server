import { NextFunction, Request, Response } from "express";
import { RecipeServices } from "./recipe.service";

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const imgUrl = req.file?.path;
  req.body.recipeImage = imgUrl;
  try {
    const result = await RecipeServices.createRecipeInToDB(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Recipe Created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all recipes
const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await RecipeServices.getAllRecipesFromDB();
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Recipe Retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all recipes
const getSingleRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await RecipeServices.getSingleRecipesFromDB(id);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Recipe Retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//view recipe
const viewRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipeId } = req.params;
    const payload = req.body;

    const result = await RecipeServices.viewRecipeFromDB(recipeId, payload);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Recipe Viewed successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//react recipe
const reactRecipe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { recipeId } = req.params;

    const result = await RecipeServices.reactRecipeIntoDB(recipeId, req.body);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "React successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const RecipeController = {
  createRecipe,
  getAllRecipes,
  getSingleRecipes,
  viewRecipe,
  reactRecipe,
};
