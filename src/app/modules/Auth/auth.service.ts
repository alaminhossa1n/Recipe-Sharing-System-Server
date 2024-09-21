import UserModel from "../Users/user.model";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
import { TUser } from "../Users/user.interface";

const signInToDB = async (payload: TUser) => {
  try {
    // Check if the user exists
    let isUserExist = await UserModel.findOne({
      email: payload?.email,
    });
    if (!isUserExist) {
      throw new AppError(404, "User does not exist!"); // Custom error for user not found
    }

    // Verify the password
    const isPasswordMatched = await bcrypt.compare(
      payload.password as string,
      isUserExist.password as string
    );

    if (!isPasswordMatched) {
      throw new AppError(401, "Wrong password!"); // Custom error for wrong password
    } else {
      isUserExist = isUserExist?.toObject(); // Convert to plain JS object
      delete isUserExist?.password; // Manually remove the password field
    }

    // Generate JWT payload
    const jwtPayload = {
      email: isUserExist.email,
      displayName: isUserExist.displayName,
      photoURL: isUserExist.photoURL,
      coin: isUserExist.coin,
    };

    // Generate access token
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: "10d",
    });

    // Return user and token
    return {
      success: true,
      statusCode: 200,
      message: "Sign in successful",
      data: {
        user: isUserExist,
        token: accessToken,
      },
    };
  } catch (err) {
    // Throw the error to be caught by the controller or error handler
    throw err instanceof AppError
      ? err
      : new AppError(500, "Internal server error");
  }
};

const googleSinInToDB = async (payload: TUser) => {
  try {
    // Check if the user exists
    let isUserExist = await UserModel.findOne({
      email: payload?.email,
    })

    // Prepare user data for the JWT payload
    const userPayload = isUserExist || payload;

    // Generate JWT payload
    const jwtPayload = {
      email: userPayload.email,
      displayName: userPayload.displayName,
      photoURL: userPayload.photoURL,
    };

    // Generate access token
    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
      expiresIn: "10d",
    });

    // If the user exists, return the existing user data
    if (isUserExist) {
      return {
        success: true,
        statusCode: 200,
        message: "Sign in successful",
        data: {
          user: isUserExist,
          token: accessToken,
        },
      };
    }

    // If the user does not exist, create a new user and return the result
    const newUser = await UserModel.create(payload);
    return {
      success: true,
      statusCode: 201,
      message: "User created successfully",
      data: {
        user: newUser,
        token: accessToken,
      },
    };
  } catch (error) {
    throw error instanceof AppError
      ? error
      : new AppError(500, "Internal server error");
  }
};


export const authService = {
  signInToDB,
  googleSinInToDB,
};
