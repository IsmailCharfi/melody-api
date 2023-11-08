import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/JwtStrategy';
import * as dotenv from 'dotenv';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EventsModule } from 'src/events/events.module';
import { Repository } from 'typeorm';

dotenv.config();

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [UserService, JwtStrategy],
  imports: [
    EventsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.SECRET }),
  ],
})
export class AuthModule {}
