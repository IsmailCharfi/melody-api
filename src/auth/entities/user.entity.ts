import { AbstractEntity } from 'src/misc/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { SerializeUserDto } from 'src/auth/dto/serialize-user.dto';
import { Ticket } from 'src/events/entities/ticket.entity';
import { SerializeMinimalUserDto } from '../dto/serialize-minimal-user.dto';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user, { eager: true })
  tickets: Ticket[];

  exportMinimal(): SerializeMinimalUserDto {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }

  export(): SerializeUserDto {
    return {
      ...this.exportMinimal(),
      tickets: this.tickets?.map((t) => t.export()) ?? [],
    };
  }
}
