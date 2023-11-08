import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { CredenialsDto } from 'src/auth/dto/credenials.dto';
import { AbstractController, HttpResponse } from 'src/misc/abstract.controller';
import { LoginResponeDto } from 'src/auth/dto/login-respone.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { TicketService } from 'src/events/services/ticket.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { ErrorMessages } from 'src/misc/error-message.enum';
import { SerializeUserDto } from '../dto/serialize-user.dto';

@Controller('auth')
export class AuthController extends AbstractController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly ticketService: TicketService,
  ) {
    super();
  }

  @Get('connected-user')
  @UseGuards(JwtAuthGuard)
  async getConnectedUser(
    @GetUser() user: User,
  ): Promise<HttpResponse<SerializeUserDto>> {
    const connectedUser = await this.userService.getUserByEmail(user.email);

    if (!connectedUser) {
      throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED);
    }

    const tickets = await this.ticketService.getTicketsByUser(user);

    user.tickets = tickets;

    return this.renderSuccessResponse(user.export());
  }

  @Post('login')
  async login(
    @Body() credentialsDto: CredenialsDto,
  ): Promise<HttpResponse<LoginResponeDto>> {
    const response = await this.authService.login(credentialsDto);

    return this.renderSuccessResponse(response);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<HttpResponse<LoginResponeDto>> {
    const response = await this.authService.register(registerDto);

    return this.renderSuccessResponse(response);
  }
}
