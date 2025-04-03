import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from 'src/utils/cloudinary.config';
import * as path from 'path';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

const storage = new CloudinaryStorage({
  cloudinary,
  params: <any>{
    folder: 'my-uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      return path.parse(file.originalname).name + '-' + uniqueSuffix;
    },
  },
});

@Controller('upload')
export class UploadsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file || !file.buffer) {
        return { message: '❌ فایل دریافت نشد', success: false };
      }

      const fileHash = crypto
        .createHash('sha256')
        .update(file.buffer)
        .digest('hex');

      const existing = await this.prisma.image.findUnique({
        where: { hash: fileHash },
      });

      if (existing) {
        return {
          message: '✅ فایل تکراری بود، آدرس قبلی برگشت داده شد',
          filePath: existing.url,
          hash: existing.hash,
          duplicate: true,
          success: true,
        };
      }

      const newImage = await this.prisma.image.create({
        data: {
          url: file.path,
          hash: fileHash,
        },
      });

      return {
        message: '✅ آپلود موفق',
        filePath: newImage.url,
        hash: newImage.hash,
        duplicate: false,
        success: true,
      };
    } catch (error) {
      console.error('❌ ارور دقیق:', error); // مهم‌ترین بخش
      return {
        statusCode: 500,
        message: '❌ خطا در سرور',
        error: error.message || error,
      };
    }
  }
}
