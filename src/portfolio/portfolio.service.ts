import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './create-portfolio.dto';
import { UpdatePortfolioDto } from './update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePortfolioDto) {
    console.log('📦 dto received in create():', dto);
    return this.prisma.portfolio.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        thumbnail: dto.thumbnail, 
        shortDesc: dto.shortDesc,
        content: dto.content,
        gallery: {
          create: dto.galleryImages?.map((url) => ({ imageUrl: url })) || [],
        },
      },
      include: {
        gallery: true,
      },
    });
  }

  async findALL() {
    return this.prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        gallery: true,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { gallery: true },
    });

    console.log('🎯 Portfolio with gallery:', result);
    return result;
  }

  async findBySlug(slug: string) {
    return this.prisma.portfolio.findUnique({
      where: { slug },
      include: {
        gallery: true,
      },
    });
  }

  async update(id: number, dto: UpdatePortfolioDto) {
    const { gallery, ...rest } = dto;

    const cleanData: any = {
      ...rest,
    };

    if (gallery) {
      cleanData.gallery = {
        deleteMany: {}, // پاک‌کردن گالری قبلی
        create: gallery.map((url) => ({ imageUrl: url })),
      };
    }

    try {
      return await this.prisma.portfolio.update({
        where: { id },
        data: cleanData,
        include: {
          gallery: true,
        },
      });
    } catch (error) {
      console.error('❌ Prisma update error:', error);
      throw error;
    }
  }

  async delete(id: number) {
    // پاک‌کردن گالری‌های مرتبط
    await this.prisma.galleryImage.deleteMany({
      where: {
        portfolioId: id,
      },
    });

    // بعدش پاک کردن خود نمونه‌کار
    return this.prisma.portfolio.delete({
      where: { id },
    });
  }
}
