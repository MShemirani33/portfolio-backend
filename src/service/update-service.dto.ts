import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateServiceDto {
  @ApiPropertyOptional({
    example: 'ویرایش طراحی سایت',
    description: 'عنوان جدید برای خدمت (اختیاری)',
  })
  @IsOptional()
  @IsString()
  title?: string;
}
