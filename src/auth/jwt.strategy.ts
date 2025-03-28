import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MY_SECRET_KEY', // بهتره از env بیاد
    });
  }

  async validate(payload: any) {
    // این چیزی‌ه که تو jwt.signAsync() گذاشتیم
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role, // اگه خواستیم بعداً اضافه کنیم
    };
  }
}
