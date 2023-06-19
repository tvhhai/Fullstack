import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LocalGuards } from './guards/local.guard';
import { JwtGuards } from './guards/jwt.guard';
import { UserRes } from 'src/features/users/dto/res/user-res.dto';
import { DataRes } from 'src/shared/dto/res/data-res.dto';
import { get } from 'lodash';
import { CreateUserDto } from 'src/features/users/dto/req/create-user.dto';
import { RefreshGuard } from './guards/refresh.guard';
import { Public } from './decorators/public.decorator';
import { COOKIE_NAME } from 'src/shared/constants/common.constant';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @UseGuards(LocalGuards)
  @Post('auth/sign-in')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const accessToken = await this.authService.getJwtToken(
        req.user as UserRes,
      );
      const refreshToken = await this.authService.getRefreshToken(
        get(req, 'user.id'),
      );

      const secretData = {
        accessToken,
        refreshToken,
      };

      this.authService.setCookie(res, COOKIE_NAME, secretData);
      return req.user;
    } catch (error) {
      throw new HttpException(
        'Sing In failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Public()
  @Post('auth/sign-up')
  async registerAuth(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      await this.authService.signUp(createUserDto);
      const dataResponse: DataRes<[]> = {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
      return dataResponse;
    } catch (error) {
      const dataResponse: DataRes<[]> = {
        statusCode: error.status,
        message: error.response,
        data: [],
      };
      return dataResponse;
    }
  }

  @Public()
  @Post('auth/sign-out')
  async logoutUser(@Res({ passthrough: true }) res: Response) {
    try {
      this.authService.clearCookie(res, COOKIE_NAME);
      const dataResponse: DataRes<[]> = {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: [],
      };
      return dataResponse;
    } catch (error) {
      throw new HttpException(
        'Logout failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Public()
  @UseGuards(RefreshGuard)
  @Get('token/refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const refreshTokenData = await this.authService.findRefreshToken(
        get(req, 'cookies.auth-cookie.refreshToken'),
      );

      const refreshToken = await this.authService.verifyRefreshTokenExpiration(
        refreshTokenData,
      );

      const accessToken = await this.authService.getJwtToken(
        req.user as UserRes,
      );

      const secretData = {
        accessToken,
        refreshToken,
      };

      this.authService.setCookie(res, COOKIE_NAME, secretData);
      const dataResponse: DataRes<[]> = {
        statusCode: HttpStatus.OK,
        message: 'Token is refreshed successfully!',
        data: [],
      };
      return dataResponse;
    } catch (error) {}
  }

  @UseGuards(JwtGuards)
  @Get('current-user')
  getCurrentUser(@Req() req): DataRes<UserRes> {
    try {
      const user = req.user;

      return {
        statusCode: HttpStatus.OK,
        message: 'Success',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        'Get Current User Failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
