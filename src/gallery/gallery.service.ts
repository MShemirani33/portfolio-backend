// src/gallery/gallery.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async addImagesBulk(portfolioId: number, images: string[]) {
    const data = images.map((url) => ({
      imageUrl: url,
      portfolioId,
    }));
    return this.prisma.galleryImage.createMany({
      data,
    });
  }

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

  async getGalleryByPortfolio(portfolioId: number) {
    return this.prisma.galleryImage.findMany({
      where: { portfolioId },
    });
  }
}
