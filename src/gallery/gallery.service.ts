// src/gallery/gallery.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  // افزودن چند تصویر به گالری
  async addImagesBulk(portfolioId: number, images: string[]) {
    const data = images.map((url) => ({
      imageUrl: url,
      portfolioId,
    }));
    return this.prisma.galleryImage.createMany({
      data,
    });
  }

  // بروزرسانی کامل گالری تصاویر پروژه
  async updateGallery(portfolioId: number, images: string[]) {
    // ابتدا گالری موجود برای پروژه مورد نظر را پیدا میکنیم
    const existingGallery = await this.prisma.galleryImage.findMany({
      where: { portfolioId },
    });

    // اگر گالری موجود نباشد، خطا می‌دهیم
    if (!existingGallery)
      throw new NotFoundException('گالری برای این پروژه یافت نشد');

    // ابتدا تصاویر قدیمی را حذف می‌کنیم
    await this.prisma.galleryImage.deleteMany({
      where: { portfolioId },
    });

    // سپس تصاویر جدید را اضافه می‌کنیم
    const newImages = images.map((url) => ({
      imageUrl: url,
      portfolioId,
    }));

    return this.prisma.galleryImage.createMany({
      data: newImages,
    });
  }

  // حذف یک تصویر از گالری پروژه
  async deleteImageFromPortfolio(portfolioId: number, imageId: number) {
    const image = await this.prisma.galleryImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.portfolioId !== portfolioId) {
      throw new NotFoundException(
        'تصویر موردنظر یافت نشد یا متعلق به این پروژه نیست',
      );
    }

    return this.prisma.galleryImage.delete({
      where: { id: imageId },
    });
  }

  // دریافت گالری یک پروژه
  async getGalleryByPortfolio(portfolioId: number) {
    return this.prisma.galleryImage.findMany({
      where: { portfolioId },
    });
  }

  // دریافت یک تصویر از گالری یک پروژه
  async getImageFromPortfolio(portfolioId: number, imageId: number) {
    const image = await this.prisma.galleryImage.findUnique({
      where: { id: imageId },
    });

    if (!image || image.portfolioId !== portfolioId) {
      throw new NotFoundException('تصویر یافت نشد یا متعلق به این پروژه نیست');
    }

    return image;
  }
}
