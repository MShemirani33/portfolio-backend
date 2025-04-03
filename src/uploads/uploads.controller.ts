import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as crypto from 'crypto';
import * as path from 'path';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import { Readable } from 'stream';
import { AuthGuard } from '@nestjs/passport';

interface UploadResult {
  message: string;
  filePath: string;
  hash: string;
  duplicate: boolean;
  success: boolean;
}

@Controller('upload')
export class UploadsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('images')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files', 10, { storage: multer.memoryStorage() }))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]): Promise<UploadResult[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('فایل دریافت نشد ❌');
    }

    const uploadResults: UploadResult[] = [];

    for (const file of files) {
      if (!file || !file.buffer) {
        throw new BadRequestException('حداقل یکی از فایل‌ها معتبر نیست ❌');
      }

      const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');
      const existing = await this.prisma.image.findUnique({
        where: { hash: fileHash },
      });

      if (existing) {
        uploadResults.push({
          message: '✅ تصویر تکراری بود - آدرس قبلی برگشت داده شد',
          filePath: existing.url,
          hash: existing.hash,
          duplicate: true,
          success: true,
        });
        continue;
      }

      const uploadResult = await this.uploadToCloudinary(file.buffer, file.originalname);

      const newImage = await this.prisma.image.create({
        data: {
          url: uploadResult.secure_url,
          hash: fileHash,
        },
      });

      uploadResults.push({
        message: '✅ آپلود موفق',
        filePath: newImage.url,
        hash: newImage.hash,
        duplicate: false,
        success: true,
      });
    }

    return uploadResults;
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
          if (!result) return reject(new Error('Cloudinary result is undefined'));
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
