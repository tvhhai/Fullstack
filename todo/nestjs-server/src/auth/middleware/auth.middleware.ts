import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { isNotEmptyObject } from 'class-validator';
import { Request, Response } from 'express';
import { IToken } from '@shared/model/permissions.model';
import { COOKIE_NAME } from '@shared/constants/common.constant';
import { AuthService } from '@auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  private thresholdMinuteRefreshToken = 2;

  async use(@Req() req: Request, @Res() res: Response, next: () => void) {
    const token = req.cookies;
    if (req.path === '/api/auth/sign-in') {
      next();
      return;
    }

    if (!token || !token[COOKIE_NAME]?.accessToken) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    await this.checkTokenExpiration(req, res);
    next();
  }

  async checkTokenExpiration(req: Request, res: Response) {
    const token: IToken = req.cookies;
    if (isNotEmptyObject(token)) {
      const { accessToken, refreshToken } = token[COOKIE_NAME];
      const tokenInfo = this.jwtService.decode(accessToken);
      const now = new Date().getTime();

      const expirationDate = new Date(tokenInfo['exp'] * 1000).getTime();
      const timeDiff = expirationDate - now;
      const minutesDiff = new Date(timeDiff).getMinutes();

      console.log({
        'Issued At': dayjs(tokenInfo['iat'] * 1000).format(
          'DD/MM/YYYY hh:mm:ss',
        ),
        Expired: dayjs(tokenInfo['exp'] * 1000).format('DD/MM/YYYY hh:mm:ss'),
        Now: dayjs().format('DD/MM/YYYY hh:mm:ss'),
        'Time remaining until token expiration:': minutesDiff + ' minutes',
      });

      if (minutesDiff <= this.thresholdMinuteRefreshToken) {
        await this.refreshToken(refreshToken, req, res);
      }
    }
  }

  async refreshToken(refreshToken: string, req: Request, res: Response) {
    await this.authService.handleRefreshToken(refreshToken, req, res);
  }
}
