import { Schema, model } from "mongoose";
import { TRecipe } from "./recipe.interface";

const recipeSchema = new Schema<TRecipe>({
  recipeName: { type: String, required: true },
  recipeImage: { type: String, required: true },
  recipeDetails: { type: String, required: true },
  video: { type: String, required: false },
  country: { type: String, required: true },
  category: { type: String, required: true },
  purchased_by: { type: [String], default: [] },
  creatorEmail: { type: String, required: true },
  watchCount: { type: Number },
});

const RecipeModel = model("Recipes", recipeSchema);

export default RecipeModel;
