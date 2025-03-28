import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';
import { HomePageContentModule } from './home-page-content/home-page-content.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PortfolioModule, PrismaModule, ServiceModule, HomePageContentModule, ContactModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
