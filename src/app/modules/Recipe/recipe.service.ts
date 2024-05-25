import { TRecipe } from "./recipe.interface";
import RecipeModel from "./recipe.model";

const createRecipeInToDB = async (payload: TRecipe) => {
  const result = await RecipeModel.create(payload);
  return result;
};

export const RecipeServices = {
  createRecipeInToDB,
};
