import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config(); // لود کردن env

cloudinary.config({
  url: process.env.CLOUDINARY_URL, // استفاده از URL برای تنظیمات
});

export { cloudinary };
