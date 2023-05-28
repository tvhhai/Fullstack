import {
  Body,
  Request,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Logger,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GuardService } from './guard/guard.service';
import { CurrentUser } from '../features/users/users.controller';
import { Response } from 'express';
import { LocalGuards } from './guards/local.guards';
import { JwtGuards } from './guards/jwt.guards';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    Logger.log('info', signInDto);
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(GuardService)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtGuards)
  @Get('current-user')
  async getCurrentUser(@Req() req) {
    const user = req.user;
    console.log('user', user);
    return { user };
    // return await this.usersService.getCurrentUser();
  }

  @UseGuards(LocalGuards)
  @Post('auth/sign-in')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.getJwtToken(req.user as CurrentUser);
    const refreshToken = await this.authService.getRefreshToken(
      req.user.userId,
    );

    const secretData = {
      token,
      refreshToken,
    };
    console.log(secretData);
    res.cookie('auth-cookie', secretData, {
      httpOnly: true,
      domain: '',
      secure: true,
      maxAge: 1800000,
    });
    // res.cookie('accessToken', token, {
    //   maxAge: 1000 * 60 * 60 * 24 * 31,
    //   httpOnly: true,
    //   domain: '',
    //   secure: true,
    // });
    // res.cookie('refreshToken', refreshToken, {
    //   maxAge: 1000 * 60 * 60 * 24 * 31,
    //   httpOnly: true,
    //   domain: '',
    //   secure: true,
    // });
    return req.user;
  }
}
