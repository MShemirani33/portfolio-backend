import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as crypto from 'crypto';
import * as path from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
import { AuthGuard } from '@nestjs/passport';

@Controller('upload')
export class UploadsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('image')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new BadRequestException('فایل دریافت نشد ❌');
    }

    // 1. هش کردن تصویر
    const fileHash = crypto
      .createHash('sha256')
      .update(file.buffer)
      .digest('hex');

    // 2. بررسی وجود تصویر تکراری
    const existing = await this.prisma.image.findUnique({
      where: { hash: fileHash },
    });

    if (existing) {
      return {
        message: '✅ تصویر تکراری بود - آدرس قبلی برگشت داده شد',
        filePath: existing.url,
        hash: existing.hash,
        duplicate: true,
        success: true,
      };
    }

    // 3. آپلود به Cloudinary
    const uploadResult = await this.uploadToCloudinary(
      file.buffer,
      file.originalname,
    );

    // 4. ذخیره در دیتابیس
    const newImage = await this.prisma.image.create({
      data: {
        url: uploadResult.secure_url,
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
  }

  private async uploadToCloudinary(
    fileBuffer: Buffer,
    originalname: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'my-uploads',
          resource_type: 'image',
          public_id: path.parse(originalname).name + '-' + Date.now(),
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result)
            return reject(new Error('Cloudinary result is undefined'));
          resolve(result);
        },
      );

      const readable = new Readable();
      readable.push(fileBuffer);
      readable.push(null);
      readable.pipe(stream);
    });
  }
}
