import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token';
import * as dayjs from 'dayjs';
import { UserRes } from 'src/features/users/dto/res/user-res.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/features/users/dto/req/create-user.dto';
import { get, unset } from 'lodash';
import { User } from 'src/features/users/entities/user.entity';

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

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return {
      id: user.id,
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
    secure?: boolean,
    domain?: string,
  ): void => {
    response.cookie(name, value, {
      httpOnly: true,
      secure,
      maxAge: this.configService.get<number>('jwtConfig.cookieExpireIn'),
      domain,
    });
  };

  clearCookie = (response: Response, name: string): void => {
    response.cookie(name, { maxAge: 0 });
  };
}
