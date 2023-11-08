import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ErrorMessages } from 'src/misc/error-message.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser(registerDto: RegisterDto): Promise<User> {
    let user = await this.getUserByEmail(registerDto.email);

    if (user) {
      throw new HttpException(
        ErrorMessages.USER_ALREADY_EXISTS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    user = this.userRepository.create(registerDto);
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);

    return this.userRepository.save(user);
  }
}
