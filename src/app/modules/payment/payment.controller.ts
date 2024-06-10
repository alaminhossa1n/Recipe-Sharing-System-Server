import { NextFunction, Request, Response } from "express";
import config from "../../config";

const stripe = require("stripe")(config.payment_secret_key);

const createPaymentIntents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { price } = req.body;
    price = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const paymentController = {
  createPaymentIntents,
};
