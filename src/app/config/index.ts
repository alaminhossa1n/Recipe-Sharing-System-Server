import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_ACCESS_SECRET,
  salt_rounds: process.env.saltRounds,
  NODE_ENV: process.env.NODE_ENV,
  payment_secret_key: process.env.PAYMENT_SECRET_KEY,
  cd_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cd_api_key: process.env.CLOUDINARY_API_KEY,
  cd_api_secret: process.env.CLOUDINARY_API_SECRET,
};
