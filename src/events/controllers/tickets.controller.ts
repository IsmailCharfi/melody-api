import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AbstractController } from 'src/misc/abstract.controller';
import { ErrorMessages } from 'src/misc/error-message.enum';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Client } from '../enums/client.enum';
import { TicketService } from '../services/ticket.service';

@Controller('tickets')
export class TicketsController extends AbstractController {
  constructor(private readonly ticketService: TicketService) {
    super();
  }

  @Get('/:id/generate')
  async generateTicket(
    @Param('id') id: number,
    @Query('client') client: number,
    @GetUser() user: User,
  ) {
    if (!client || !user) {
      throw new BadRequestException(ErrorMessages.UNAUTHORIZED);
    }

    const ticket = await this.ticketService.getTicketWithUser(id);

    if (!ticket) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND);
    }

    if (ticket.user.id != user.id) {
      throw new UnauthorizedException(ErrorMessages.UNAUTHORIZED);
    }

    try {
      let filePath = '';

      switch (client) {
        case Client.APPLE:
          filePath = await this.ticketService.generateAppleTicket(ticket);
          break;
        case Client.GOOGLE:
          filePath = await this.ticketService.generateGoogleTicket(ticket);
          break;
        default:
          throw Error('Unknown Client');
      }

      return this.renderSuccessResponse(filePath);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
