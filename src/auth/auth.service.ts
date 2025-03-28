import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: LoginDto) {
    // 1️⃣ پیدا کردن ادمین با ایمیل
    const admin = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    // اگر ایمیل پیدا نشد → خطای Unauthorized
    if (!admin) {
      throw new UnauthorizedException('ایمیل اشتباه است.');
    }

    // 2️⃣ بررسی رمز با bcrypt
    const isPasswordValid = await bcrypt.compare(dto.password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('رمز عبور اشتباه است.');
    }

    // 3️⃣ تولید توکن JWT
    const token = await this.jwt.signAsync({
      id: admin.id,
      email: admin.email,
    });

    // 4️⃣ بازگشت پاسخ به فرانت
    return {
      message: 'ورود با موفقیت انجام شد!',
      token,
    };
  }
  async createAdmin(dto: CreateAdminDto, currentUser: any) {
    // فقط اگر نقش کاربر "superadmin" باشه اجازه داره
    if (currentUser.role !== 'superadmin') {
      throw new UnauthorizedException('شما دسترسی لازم را ندارید.');
    }

    // چک کنیم ایمیل تکراری نباشه
    const existing = await this.prisma.admin.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new UnauthorizedException('این ایمیل قبلاً ثبت شده است.');
    }

    // هش کردن رمز
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // ساخت ادمین جدید
    return this.prisma.admin.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: 'admin', // پیش‌فرض نقش admin
      },
    });
  }
}
