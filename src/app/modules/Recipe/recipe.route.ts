import { Router } from "express";
import { RecipeController } from "./recipe.controller";
import upload from "../../config/multer";

const router = Router();

router.post(
  "/create-recipe",
  upload.single("image"),
  RecipeController.createRecipe
);
router.get("/all-recipe", RecipeController.getAllRecipes);
router.get("/single-recipe/:id", RecipeController.getSingleRecipes);
router.patch("/view-recipe/:recipeId", RecipeController.viewRecipe);
router.patch("/react-recipe/:recipeId", RecipeController.reactRecipe);

export const recipeRoute = router;
