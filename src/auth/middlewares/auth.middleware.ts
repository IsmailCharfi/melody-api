import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      token = (req.query.token as string) ?? null;
    }

    if (token) {
      try {
        const payload = this.jwtService.verify(token);
        req.user = payload as User;
      } catch (error) {
        throw new InternalServerErrorException('An error has occured');
      }
    }

    next();
  }
}
