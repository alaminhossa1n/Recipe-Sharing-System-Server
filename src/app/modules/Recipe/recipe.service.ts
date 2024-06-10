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

// update recipe
interface UpdatePayload {
  email: string;
}
const updateRecipeInToDB = async (id: string, payload: UpdatePayload) => {
  try {
    const { email } = payload;
    const targetRecipe = await RecipeModel.findOne({ _id: id });

    if (targetRecipe?.creatorEmail === email) {
      return "You are the Creator of this recipe";
    }

    const result = await RecipeModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { purchased_by: email, } },
      { new: true }
    );

    if (!result) {
      throw new Error("Recipe not found");
    }

    return result;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating recipe:", error);
    // Optionally, you can throw the error to be handled by the caller
    throw error;
  }
};

export const RecipeServices = {
  createRecipeInToDB,
  getAllRecipesFromDB,
  getSingleRecipesFromDB,
  updateRecipeInToDB,
};
