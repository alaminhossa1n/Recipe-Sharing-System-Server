// config/multer.ts
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Specify the folder in Cloudinary where images will be stored
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

export default upload;
