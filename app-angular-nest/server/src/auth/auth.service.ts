import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { CurrentUser, UsersService } from 'src/features/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../features/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as randomToken from "rand-token";
import * as dayjs from "dayjs";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<CurrentUser | null> {
    const user = await this.usersService.findUser(username);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return null;
    }
    const currentUser = new CurrentUser();
    currentUser.userId = user.id;
    currentUser.firstName = user.firstName;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;

    return currentUser;
  }

  async getJwtToken(user: CurrentUser): Promise<string> {
    const payload = {
      ...user,
    };
    return this.jwtService.signAsync(payload);
  }

  async getRefreshToken(id: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: dayjs().day(1).format('YYYY/MM/DD'),
    };

    await this.usersService.updateUser(id, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('NotFoundUser');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
