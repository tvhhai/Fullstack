import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.path === '/sign-in') {
      next();
      return;
    }
    const token = req.cookies;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    next();
  }
}
