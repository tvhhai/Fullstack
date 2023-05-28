import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: 'jwtSecret',
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies['auth-cookie'];
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }
  // async validate(payload: any) {
  //   return { userId: payload.sub, username: payload.username };
  // }
  async validate(payload: any) {
    console.log('payload', payload);
    if (!payload) {
      console.log('slllllllllllllll');
      throw new UnauthorizedException();
    }
    return payload;
  }
}
