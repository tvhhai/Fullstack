import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
export class CurrentUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private auth: AuthService) {
    super();
  }

  public async validate(
    username: string,
    password: string,
  ): Promise<CurrentUser> {
    const user = await this.auth.validateUserCredentials(username, password);
    console.log('user', user);
    if (user == null) {
      console.log('s');
      throw new UnauthorizedException();
    }
    return user;
  }
}
