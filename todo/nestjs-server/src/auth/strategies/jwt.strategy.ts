import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserRes } from '@features/rbac/users/dto/res/user-res.dto';
import { ConfigService } from '@nestjs/config';
import { COOKIE_NAME } from '@shared/constants/common.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwtConfig.jwtSecretKey'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies[COOKIE_NAME];
          if (!data) {
            return null;
          }
          return data.accessToken;
        },
      ]),
    });
  }

  async validate(payload: UserRes) {
    if (!payload) {
      // throw new UnauthorizedException();
    }
    return payload;
  }
}
