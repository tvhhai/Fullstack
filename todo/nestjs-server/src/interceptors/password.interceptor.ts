import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { FAKE_PASSWORD } from '@shared/constants/common.constant';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((val) => this.hidePasswords(val)));
  }

  private hidePasswords(val: any): any {
    if (val && val.data) {
      const data = val.data;

      if (Array.isArray(data)) {
        data.forEach((item) => this.hidePassword(item));
      } else if (typeof data === 'object') {
        this.hidePassword(data);
      }
    }

    return val;
  }

  private hidePassword(data: any): void {
    if (data.password) {
      data.confirmPassword = data.password = FAKE_PASSWORD;
    }
  }
}
