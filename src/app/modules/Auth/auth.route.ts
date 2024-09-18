import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/signin", authController.signIn);
router.post("/google-signin", authController.googleSigIn);

export const authRoute = router;
