import { Router } from "express";
import { RecipeController } from "./recipe.controller";

const router = Router();

router.post("/create-recipe", RecipeController.createRecipe);
router.get("/all-recipe", RecipeController.getAllRecipes);
router.get("/single-recipe/:id", RecipeController.getSingleRecipes);
router.patch("/update/:id",RecipeController.updateRecipe);

export const recipeRoute = router;
