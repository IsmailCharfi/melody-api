import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { UserService } from './user.service';
import { CredenialsDto } from 'src/auth/dto/credenials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from 'src/auth/dto/jwt-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponeDto } from 'src/auth/dto/login-respone.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ErrorMessages } from 'src/misc/error-message.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<LoginResponeDto> {
    const user = await this.userService.createUser(registerDto);

    return this.createTokenAndReturn(user);
  }

  async login(credentialsDto: CredenialsDto): Promise<LoginResponeDto> {
    const { email, password } = credentialsDto;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new HttpException(
        ErrorMessages.WRONG_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.createTokenAndReturn(user);
  }

  private createTokenAndReturn(user: User): LoginResponeDto {
    const payload: JwtPayloadDto = user.exportMinimal();

    const jwt = this.jwtService.sign(payload);

    return {
      token: jwt,
      user: user.export(),
    };
  }
}
