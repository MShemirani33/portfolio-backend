import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContentDto } from './create-content.dto';
import { UpdateContentDto } from './update-content.dto';

@Injectable()
export class HomePageContentService {
  constructor(private prisma: PrismaService) {}

  async upsert(dto: CreateContentDto) {
    return this.prisma.homePageContent.upsert({
      where: { key: dto.key },
      update: { value: dto.value },
      create: {
        key: dto.key,
        value: dto.value,
      },
    });
  }

  async findAll() {
    return this.prisma.homePageContent.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findByKey(key: string) {
    return this.prisma.homePageContent.findUnique({
      where: { key },
    });
  }


  async delete(key: string) {
    return this.prisma.homePageContent.delete({
      where: { key },
    });
  }
}
