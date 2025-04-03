// src/gallery/gallery.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async addImage(portfolioId: number, imageUrl: string) {
    return this.prisma.galleryImage.create({
      data: {
        portfolioId,
        imageUrl,
      },
    });
  }

  async deleteImage(id: number) {
    return this.prisma.galleryImage.delete({
      where: { id },
    });
  }

  async getGalleryByPortfolio(portfolioId: number) {
    return this.prisma.galleryImage.findMany({
      where: { portfolioId },
    });
  }
}
