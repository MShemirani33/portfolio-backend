import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('مستندات REST API پروژه')
    .setVersion('1.0')
    .addBearerAuth() // اگر نیاز به احراز هویت داری
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://portfolio-site-rust-iota.vercel.app',
      'https://melikashemirani.ir',
    ],
    credentials: true,
  });
  const distPath = path.join(__dirname);
try {
  fs.rmdirSync(distPath, { recursive: true });
  console.log('❌ dist پاک شد'); // این باید خطا بده!
} catch (err) {
  console.error('🚨 تست دسترسی به dist:', err.message);
}
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
