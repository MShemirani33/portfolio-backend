import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@example.com',
    description: 'ایمیل ادمین برای ورود',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'yourStrongPassword',
    description: 'رمز عبور ادمین',
  })
  @IsString()
  password: string;
}
