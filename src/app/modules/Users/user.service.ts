import mongoose from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import jwt from "jsonwebtoken";

const createUserInToDB = async (payload: TUser) => {
  try {
    const isUserExist = await UserModel.findOne({ email: payload?.email });

    const jwtPayload = {
      email: payload?.email,
      displayName: payload?.displayName,
      photoURL: payload?.photoURL,
      coin: payload?.coin,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: "10d",
    });

    if (!isUserExist) {
      const result = await UserModel.create(payload);
      return {
        user: result,
        token: accessToken,
      };
    } else {
      return {
        user: isUserExist,
        token: accessToken,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

const getSingleUserFromDB = async (email: string) => {
  const result = await UserModel.findOne({ email });
  return result;
};

const updateCoinsInToDB = async (payload) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { viewerEmail, creatorEmail, type, coin } = payload;

  try {
    if (type === "buy") {
      const viewerUpdateResult = await UserModel.updateOne(
        { email: viewerEmail },
        { $inc: { coin } }
      );

      return { viewerUpdateResult };
    }
    if (type === "normal") {
      // Decrease coins from viewer
      const viewerUpdateResult = await UserModel.updateOne(
        { email: viewerEmail },
        { $inc: { coin: -10 } },
        { session }
      );

      if (viewerUpdateResult.modifiedCount === 0) {
        throw new Error(`Failed to update coins for viewer: ${viewerEmail}`);
      }

      // Increase coins for creator
      const creatorUpdateResult = await UserModel.updateOne(
        { email: creatorEmail },
        { $inc: { coin: 1 } },
        { session }
      );

      if (creatorUpdateResult.modifiedCount === 0) {
        throw new Error(`Failed to update coins for creator: ${creatorEmail}`);
      }

      await session.commitTransaction();
      session.endSession();

      return {
        viewerUpdateResult,
        creatorUpdateResult,
      };
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Transaction failed:", error);
    throw error;
  }
};

export const UserServices = {
  createUserInToDB,
  getSingleUserFromDB,
  updateCoinsInToDB,
};
