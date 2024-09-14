import config from "../../config";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

    if (isUserExist) {
      return {
        success: true,
        statusCode: 200,
        message: "User Already Exist",
        data: null,
      };
    } else {
      const hashedPassword = await bcrypt.hash(payload.password as string, 10);
      const newUser = { ...payload, password: hashedPassword };
      const result = await UserModel.create(newUser);
      return {
        user: result,
        token: accessToken,
      };
    }
  } catch (error) {
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

const buyCoinIntoDB = async (payload: {
  viewerEmail: string;
  coin: number;
}) => {
  const { viewerEmail, coin } = payload;
  const result = await UserModel.findOneAndUpdate(
    { email: viewerEmail },
    { $inc: { coin } },
    { new: true }
  );

  return result;
};

export const UserServices = {
  createUserInToDB,
  getSingleUserFromDB,
  buyCoinIntoDB,
};
