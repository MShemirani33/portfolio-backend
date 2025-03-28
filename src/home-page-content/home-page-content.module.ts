import { Module } from '@nestjs/common';
import { HomePageContentController } from './home-page-content.controller';
import { HomePageContentService } from './home-page-content.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [HomePageContentController],
  providers: [HomePageContentService],
})
export class HomePageContentModule {}
