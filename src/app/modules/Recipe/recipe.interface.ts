import { ObjectId } from "mongodb";

export type TRecipe = {
  recipeName: string;
  recipeImage?: string;
  recipeDetails: string;
  video?: string;
  country: string;
  category: string;
  purchased_by?: ObjectId;
  creatorEmail: string;
};
