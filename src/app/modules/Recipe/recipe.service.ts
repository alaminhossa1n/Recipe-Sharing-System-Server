import mongoose from "mongoose";
import { TRecipe, TViewPayload } from "./recipe.interface";
import RecipeModel from "./recipe.model";
import UserModel from "../Users/user.model";

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

//view recipe
const viewRecipeFromDB = async (recipeId: string, payload: TViewPayload) => {
  const session = await mongoose.startSession();

  try {
    const { viewerEmail, creatorEmail } = payload;

    // Fetch the target recipe
    const targetRecipe = await RecipeModel.findOne({ _id: recipeId });

    if (!targetRecipe) {
      throw new Error("Recipe not found");
    }

    if (targetRecipe.creatorEmail === creatorEmail) {
      return "You are the Creator of this recipe";
    }

    session.startTransaction();

    // Decrement coin field for viewer
    const viewerResult = await UserModel.updateOne(
      { email: viewerEmail },
      { $inc: { coin: -10 } },
      { session }
    );

    if (viewerResult.modifiedCount === 0) {
      throw new Error(`Failed to update coins for viewer: ${viewerEmail}`);
    }

    // Increment coin field for creator
    const creatorResult = await UserModel.updateOne(
      { email: creatorEmail },
      { $inc: { coin: 1 } },
      { session }
    );

    if (creatorResult.modifiedCount === 0) {
      throw new Error(`Failed to update coins for creator: ${creatorEmail}`);
    }

    // Update purchased_by, reactors, and watch count fields in the recipe collection
    const recipeResult = await RecipeModel.findOneAndUpdate(
      { _id: recipeId },
      {
        $addToSet: { purchased_by: viewerEmail, reactors: viewerEmail },
        $inc: { watchCount: 1 },
      },
      { new: true, session } // Use session to ensure it is part of the transaction
    );

    await session.commitTransaction();
    session.endSession();

    return {
      viewerResult,
      creatorResult,
      recipeResult,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const RecipeServices = {
  createRecipeInToDB,
  getAllRecipesFromDB,
  getSingleRecipesFromDB,
  viewRecipeFromDB,
};
