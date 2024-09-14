import UserModel from "../Users/user.model";
import AppError from "../../errors/AppError";
import bcrypt from "bcrypt";
import config from "../../config";
import jwt from "jsonwebtoken";
import { TUser } from "../Users/user.interface";

const signInToDB = async (payload: TUser) => {
  try {
    const isUserExist = await UserModel.findOne({ email: payload?.email });
    if (!isUserExist) {
      throw new AppError(404, "User does not exits!");
    } else {
      const isPasswordMatched = await bcrypt.compare(
        payload.password as string,
        isUserExist.password as string
      );

      if (isPasswordMatched) {
        const jwtPayload = {
          email: isUserExist?.email,
          displayName: isUserExist?.displayName,
          photoURL: isUserExist?.photoURL,
          coin: isUserExist?.coin,
        };

        const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
          expiresIn: "10d",
        });
        return {
          user: isUserExist,
          token: accessToken,
        };
      } else {
        throw new AppError(401, "Ops Wrong Password!");
      }
    }
  } catch (err) {
    console.log(err);
    return {
      success: false,
      statusCode: 500,
      message: "Internal server error",
      data: null,
    };
  }
};

export const authService = {
  signInToDB,
};
