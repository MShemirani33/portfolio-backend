import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'طراحی رابط کاربری اپلیکیشن',
    description: 'عنوان پروژه نمونه‌کار',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'ui-design-project',
    description: 'اسلاگ یکتا برای پروژه (برای استفاده در URL)',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    example: '/uploads/thumbnail.jpg',
    description: 'آدرس تصویر بندانگشتی پروژه',
  })
  @IsString()
  thumbnail: string;

  @ApiPropertyOptional({
    example: 'توضیح کوتاه درباره پروژه...',
    description: 'توضیح کوتاه درباره پروژه (اختیاری)',
  })
  @IsOptional()
  @IsString()
  shortDesc?: string;

  @ApiProperty({
    example: '<p>توضیح کامل پروژه شامل تصاویر، متن و کد HTML</p>',
    description: 'محتوای کامل پروژه',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    example: ['/uploads/gallery1.jpg', '/uploads/gallery2.jpg'],
    description: 'آرایه‌ای از آدرس تصاویر گالری (اختیاری)',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];
}
