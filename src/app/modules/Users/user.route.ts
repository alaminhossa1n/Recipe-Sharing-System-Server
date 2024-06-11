import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/create-user", userController.createUser);
router.get("/get-single-user", userController.getSingleUser);
router.patch("/buy-coin", userController.buyCoin);

export const userRoute = router;
