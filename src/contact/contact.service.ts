import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        message: dto.message,
      },
    });
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: number) {
    return this.prisma.contactMessage.delete({ where: { id } });
  }

  async countUnread() {
    return this.prisma.contactMessage.count({ where: { isRead: false } });
  }
}
