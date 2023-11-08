import { AbstractEntity } from 'src/misc/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SerializeEventDto } from '../dto/serialize-event.dto';
import { format } from 'date-fns';
import { DateTimeFormat } from 'src/misc/date-time-format.enum';
import { Ticket } from './ticket.entity';

@Entity()
export class Event extends AbstractEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @Column()
  capacity: number;

  @Column()
  place: string;

  @Column()
  description: string;

  @Column()
  artist: string;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column()
  artistImage: string;

  @Column()
  date: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  export(): SerializeEventDto {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      place: this.place,
      description: this.description,
      artist: this.artist,
      image: this.image,
      artistImage: this.artistImage,
      category: this.category,
      date: this.date
        ? format(this.date, DateTimeFormat.API_DATE_TIME_FORMAT)
        : '',
    };
  }
}
