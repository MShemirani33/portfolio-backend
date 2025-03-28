import { Service } from './../../node_modules/.prisma/client/index.d';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './create-service.dto';
import { UpdateServiceDto } from './update-service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({
      data: {
        title: dto.title,
      },
    });
  }

  async findAll() {
    return this.prisma.service.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async update(id: number, dto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}
