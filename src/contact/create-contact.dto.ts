import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    example: 'امیرحسین',
    description: 'نام فرستنده پیام',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'amir@example.com',
    description: 'آدرس ایمیل فرستنده',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'سلام، لطفاً با من تماس بگیرید.',
    description: 'متن پیام ارسال‌شده',
  })
  @IsString()
  message: string;
}
