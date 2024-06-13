import { Router } from "express";
import { countryController } from "./country.controller";

const router = Router();

router.post("/create", countryController.createCountry);
router.get("/countries", countryController.getAllCountry);

export const countryRoute = router;
