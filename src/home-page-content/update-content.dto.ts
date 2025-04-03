import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContentDto {
  @ApiPropertyOptional({
    example: 'به‌روز شده: خوش آمدید!',
    description: 'مقدار جدید برای محتوا (اختیاری)',
  })
  @IsOptional()
  @IsString()
  value?: string;
}
