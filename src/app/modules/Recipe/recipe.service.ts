import { TRecipe } from "./recipe.interface";
import RecipeModel from "./recipe.model";

const createRecipeInToDB = async (payload: TRecipe) => {
  const result = await RecipeModel.create(payload);
  return result;
};

//get all recipes
const getAllRecipesFromDB = async () => {
  const result = await RecipeModel.find();

  return result;
};

//get single recipes
const getSingleRecipesFromDB = async (_id: string) => {
  const result = await RecipeModel.findOne({ _id });

  return result;
};

export const RecipeServices = {
  createRecipeInToDB,
  getAllRecipesFromDB,
  getSingleRecipesFromDB,
};
