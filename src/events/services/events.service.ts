import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Event } from 'src/events/entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Ticket } from '../entities/ticket.entity';
import { User } from 'src/auth/entities/user.entity';
import { ErrorMessages } from 'src/misc/error-message.enum';
import { format } from 'date-fns';
import { DateTimeFormat } from 'src/misc/date-time-format.enum';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async getEventsFromToday(connectedUser: User = null): Promise<Event[]> {
    const today = new Date();
    const formattedToday = format(today, DateTimeFormat.API_DATE_TIME_FORMAT);

    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .andWhere('event.date >= :today', { today: formattedToday });

    if (connectedUser) {
      qb.andWhere((qb: SelectQueryBuilder<Event>) => {
        const subQuery = qb
          .subQuery()
          .select('ticket.eventId')
          .from('ticket', 'ticket')
          .where('ticket.userId = :userId', { userId: connectedUser.id })
          .getQuery();
        return 'event.id NOT IN ' + subQuery;
      });
    }

    return qb.getMany();
  }

  async getEventById(id: number): Promise<Event> {
    return this.eventsRepository.findOneBy({ id });
  }

  async createTicket(event: Event, user: User): Promise<Ticket> {
    if (!event.capacity) {
      throw new HttpException(
        ErrorMessages.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    let ticket = new Ticket();

    ticket.gate = 'center';
    ticket.seat = Math.floor(Math.random() * 10).toLocaleString();
    ticket.event = event;
    ticket.user = user;

    event.capacity--;
    await this.eventsRepository.save(event);

    return this.ticketRepository.save(ticket);
  }
}
