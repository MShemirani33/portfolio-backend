import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './create-portfolio.dto';
import { UpdatePortfolioDto } from './update-portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePortfolioDto) {
    return this.prisma.portfolio.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        thumbnail: dto.thumbnail,
        shortDesc: dto.shortDesc,
        content: dto.content,
      },
    });
  }

  async findALL() {
    return this.prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.portfolio.findUnique({
      where: { id },
    });
  }

  async delete(id: number) {
    return this.prisma.portfolio.delete({
      where: { id },
    });
  }

  async update(id: number, dto: UpdatePortfolioDto) {
    return this.prisma.portfolio.update({
      where: { id },
      data: dto,
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.portfolio.findUnique({
      where: { slug },
    });
  }
}
