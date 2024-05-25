import { Router } from "express";
import { RecipeController } from "./recipe.controller";

const router = Router();

router.post("/create-recipe", RecipeController.createRecipe);

export const recipeRoute = router;
