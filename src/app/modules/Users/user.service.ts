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

export const UserServices = {
  createUserInToDB,
};
