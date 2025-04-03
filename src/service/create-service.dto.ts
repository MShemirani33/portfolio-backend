import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    example: 'طراحی وب‌سایت',
    description: 'عنوان خدمتی که در سایت نمایش داده می‌شود',
  })
  @IsString()
  title: string;
}
