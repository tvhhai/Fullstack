import { Injectable } from '@nestjs/common';
import { UsersService } from '@features/rbac/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token';
import * as dayjs from 'dayjs';
import { UserRes } from '@features/rbac/users/dto/res/user-res.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@features/rbac/users/dto/req/create-user.dto';
import { get, unset } from 'lodash';
import { User } from '@features/rbac/users/entities/user.entity';
import { COOKIE_NAME } from '@shared/constants/common.constant';
import { IToken } from '@shared/model/permissions.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<UserRes | null> {
    const user = await this.usersService.findUser(username);
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: user.roles.map((role) => role.name),
    };
  }

  async getJwtToken(user: UserRes): Promise<string> {
    const payload = {
      ...user,
    };
    if (get(payload, 'exp') && get(payload, 'iat')) {
      unset(payload, 'exp');
      unset(payload, 'iat');
    }

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwtConfig.jwtExpiresIn'),
    });
  }

  async handleRefreshToken(token: string, req: Request, res: Response) {
    const refreshTokenData = await this.findRefreshToken(token);

    const refreshToken = await this.verifyRefreshTokenExpiration(
      refreshTokenData,
    );

    const accessToken = await this.getJwtToken(req.user as UserRes);

    const secretData = {
      accessToken,
      refreshToken,
    };

    this.setCookie(res, COOKIE_NAME, secretData);
    return secretData;
  }

  async getAccessToken(req: Request) {
    const token: IToken = req.cookies;
    const { accessToken } = token[COOKIE_NAME];
    return this.jwtService.verify(accessToken);
  }

  async getRefreshToken(id: number): Promise<string> {
    const expiration = dayjs().add(
      this.configService.get<number>('jwtConfig.jwtRefreshExpiresIn'),
      'millisecond',
    );

    const expirationFormatted = expiration.format('YYYY-MM-DD HH:mm:ss');

    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: expirationFormatted,
    };

    await this.usersService.update(id, userDataToUpdate);

    return userDataToUpdate.refreshToken;
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    await this.usersService.assignUserRole(
      get(user, 'id'),
      createUserDto.roles,
    );
  }

  async findRefreshToken(token: string): Promise<User> {
    return await this.usersService.findRefreshToken(token);
  }

  async verifyRefreshTokenExpiration(tokenData: User) {
    if (tokenData) {
      const currentTime = dayjs();
      if (currentTime.isBefore(tokenData.refreshTokenExp)) {
        return this.getRefreshToken(tokenData.id);
      } else {
      }
    }
    return null;
  }

  setCookie = (
    response: Response,
    name: string,
    value: any,
    domain?: string,
  ): void => {
    response.cookie(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      maxAge: this.configService.get<number>('jwtConfig.cookieExpireIn'),
      domain,
    });
  };

  clearCookie = (response: Response, name: string): void => {
    response.cookie(name, { maxAge: 0 });
  };
}
