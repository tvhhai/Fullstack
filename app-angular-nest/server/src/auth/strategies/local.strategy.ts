import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserRes } from 'src/features/users/dto/res/user-res.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private auth: AuthService) {
    super();
  }

  public async validate(username: string, password: string): Promise<UserRes> {
    const user = await this.auth.validateUserCredentials(username, password);

    if (!user) {
      throw new UnauthorizedException('Not Found User');
    }
    return user;
  }
}
