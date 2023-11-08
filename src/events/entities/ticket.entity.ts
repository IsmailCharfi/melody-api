import { AbstractEntity } from 'src/misc/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { SerializeTicketDto } from '../dto/serialize-ticket.dto';
import { Event } from './event.entity';

@Entity()
export class Ticket extends AbstractEntity {
  @Column()
  seat: string;

  @Column()
  gate: string;

  @ManyToOne(() => Event, (event) => event.tickets, { eager: true })
  event: Event;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;

  export(): SerializeTicketDto {
    return {
      id: this.id,
      seat: this.seat,
      gate: this.gate,
      event: this.event.export(),
    };
  }
}
