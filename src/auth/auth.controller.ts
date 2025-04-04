import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { CreateAdminDto } from './create-admin.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token } = await this.authService.login(dto);

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('admin_token', token, {
      httpOnly: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: '/', 
    });

    return { message: 'ورود موفقیت‌آمیز بود ✅' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verifyToken(@Req() req) {
    return { message: 'توکن معتبر است ✅', user: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-admin')
  createAdmin(@Body() dto: CreateAdminDto, @Req() req) {
    return this.authService.createAdmin(dto, req.user);
  }
}
