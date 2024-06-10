export type TRecipe = {
  recipeName: string;
  recipeImage: string;
  recipeDetails: string;
  video?: string;
  country: string;
  category: string;
  purchased_by?: string[];
  reactors?: string[];
  creatorEmail: string;
  watchCount?: number;
};
