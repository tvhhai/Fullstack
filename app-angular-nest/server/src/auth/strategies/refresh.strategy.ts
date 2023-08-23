import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@features/rbac/users/users.service';
import { AuthService } from '../auth.service';
import { COOKIE_NAME } from '@shared/constants/common.constant';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    config: ConfigService,
  ) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
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

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('invalid jwt token');
    }
    const data = req?.cookies[COOKIE_NAME];
    if (!data?.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }

    const user = await this.userService.validRefreshToken(
      payload.username,
      data.refreshToken,
    );
    if (!user) {
      throw new BadRequestException('Token expired');
    }

    return payload;
  }
}
