import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getCounts() {
    const [messages, services, portfolios] = await Promise.all([
      this.prisma.contactMessage.count(),
      this.prisma.service.count(),
      this.prisma.portfolio.count(),
    ]);

    return {
      messageCount: messages,
      serviceCount: services,
      portfolioCount: portfolios,
    };
  }
}
