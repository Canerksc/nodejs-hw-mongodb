import multer from 'multer';
import { cloudinaryStorage } from '../config/cloudinary.js';

export const upload = multer({
  storage: cloudinaryStorage,
});