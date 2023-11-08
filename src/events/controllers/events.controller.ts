import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AbstractController, HttpResponse } from 'src/misc/abstract.controller';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/services/events.service';
import { Ticket } from '../entities/ticket.entity';
import { ErrorMessages } from 'src/misc/error-message.enum';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('events')
export class EventsController extends AbstractController {
  constructor(private readonly eventsService: EventsService) {
    super();
  }

  @Get()
  async getEvents(@GetUser() user: User): Promise<HttpResponse<Event[]>> {
    const events = await this.eventsService.getEventsFromToday(user);

    return this.renderSuccessResponse(events);
  }

  @Post('/:id/book')
  @UseGuards(JwtAuthGuard)
  async bookTicket(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<HttpResponse<Ticket>> {
    const event = await this.eventsService.getEventById(id);

    if (!event) {
      throw new HttpException(ErrorMessages.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const ticket = await this.eventsService.createTicket(event, user);

    return this.renderCreatedResponse(ticket);
  }
}
