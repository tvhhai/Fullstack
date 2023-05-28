import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtVerifyStrategy extends PassportStrategy(
  Strategy,
  'jwt-verify',
) {
  constructor() {
    super({
      ignoreExpiration: true, // Expiration of the access_token is not checked when processing the refresh_token.
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
  async validate(payload: any) {
    Logger.log('payload', payload);
    if (payload === null) {
      console.log('s');

      throw new UnauthorizedException();
    }
    return payload;
  }
}
