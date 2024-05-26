import { NextFunction, Request, Response } from "express";
import config from "../../config";
import UserModel from "../Users/user.model";
import { TUser } from "../Users/user.interface";

const stripe = require("stripe")(config.payment_secret_key);

const createPaymentIntents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { price, email, coin } = req.body;

    const isUserExist: TUser | null = await UserModel.findOne({ email });

    console.log(isUserExist?.coin);

    price = price * 100;

    const result = await UserModel.updateOne({ email }, { $inc: { coin } });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const paymentController = {
  createPaymentIntents,
};
