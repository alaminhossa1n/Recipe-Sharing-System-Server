// config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import config from "../config/index";

cloudinary.config({
    cloud_name: config.cd_cloud_name,
    api_key: config.cd_api_key,
    api_secret: config.cd_api_secret,
  });

export default cloudinary;
