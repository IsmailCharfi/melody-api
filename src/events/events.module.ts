import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { EventsController } from 'src/events/controllers/events.controller';
import { EventsService } from 'src/events/services/events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Ticket } from './entities/ticket.entity';
import { JwtModule } from '@nestjs/jwt';
import { TicketService } from './services/ticket.service';
import { TicketsController } from './controllers/tickets.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entities/user.entity';

dotenv.config();

@Module({
  controllers: [EventsController, TicketsController],
  providers: [EventsService, TicketService],
  exports: [EventsService, TicketService],
  imports: [
    TypeOrmModule.forFeature([Event, Ticket, User]),
    JwtModule.register({ secret: process.env.SECRET }),
  ],
})
export class EventsModule {}
