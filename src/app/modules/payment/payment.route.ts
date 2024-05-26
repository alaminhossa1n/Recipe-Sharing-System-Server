import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create-payment-intent", paymentController.createPaymentIntents);

export const paymentRoute = router;
