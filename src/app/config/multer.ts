// config/multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

interface CustomCloudinaryStorageParams {
  folder?: string;
  format?: (
    req: Express.Request,
    file: Express.Multer.File
  ) => string | Promise<string>;
  public_id?: (
    req: Express.Request,
    file: Express.Multer.File
  ) => string | Promise<string>;
  allowed_formats?: string[];
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => "jpg", // Or 'png' if needed
    public_id: (req, file) => file.originalname,
  } as CustomCloudinaryStorageParams,
});

const upload = multer({ storage: storage });

export default upload;
