import { Router } from "express";
import { RecipeController } from "./recipe.controller";

const router = Router();

router.post("/create-recipe", RecipeController.createRecipe);
router.get("/all-recipe", RecipeController.getAllRecipes);
router.get("/single-recipe/:id", RecipeController.getSingleRecipes);

export const recipeRoute = router;
