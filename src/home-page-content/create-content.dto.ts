import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty({
    example: 'home_title',
    description: 'کلید محتوای قابل ذخیره (مثلاً: home_title)',
  })
  @IsString()
  key: string;

  @ApiProperty({
    example: 'به سایت ما خوش آمدید',
    description: 'مقدار محتوای مربوط به کلید داده شده',
  })
  @IsString()
  value: string;
}
