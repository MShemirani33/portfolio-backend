import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'ایمیل ادمین جدید',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongpassword123',
    description: 'رمز عبور (حداقل ۶ کاراکتر)',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
