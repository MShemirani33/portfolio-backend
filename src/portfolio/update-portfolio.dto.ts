import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePortfolioDto {
  @ApiPropertyOptional({
    example: 'ویرایش عنوان پروژه',
    description: 'عنوان جدید برای پروژه (اختیاری)',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: 'new-slug-name',
    description: 'اسلاگ جدید برای پروژه (اختیاری)',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    example: '/uploads/new-thumbnail.jpg',
    description: 'تصویر جدید بندانگشتی (اختیاری)',
  })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({
    example: 'توضیح کوتاه جدید برای پروژه',
    description: 'توضیح کوتاه (اختیاری)',
  })
  @IsOptional()
  @IsString()
  shortDesc?: string;

  @ApiPropertyOptional({
    example: '<p>محتوای جدید پروژه</p>',
    description: 'محتوای HTML جدید پروژه (اختیاری)',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    example: ['/uploads/img1.jpg', '/uploads/img2.jpg'],
    description: 'آرایه‌ای از تصاویر گالری جدید (اختیاری)',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];
}
