import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { isEmpty } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { COOKIE_NAME } from '@shared/constants/common.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { cookies } = request;

    if (isEmpty(cookies)) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.jwtService.verify(
        cookies[COOKIE_NAME].accessToken,
        {
          secret: this.config.get<string>('jwtConfig.jwtSecretKey'),
        },
      );
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
