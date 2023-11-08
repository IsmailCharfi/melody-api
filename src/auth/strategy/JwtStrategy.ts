import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { UserService } from 'src/auth/services/user.service';
import * as dotenv from 'dotenv';
import { ErrorMessages } from 'src/misc/error-message.enum';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: JwtPayloadDto) {
    const user = await this.userService.getUserByEmail(payload.email);
    if (!user) {
      throw new HttpException(
        ErrorMessages.WRONG_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
