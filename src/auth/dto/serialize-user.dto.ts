import { SerializeTicketDto } from 'src/events/dto/serialize-ticket.dto';
import { SerializeMinimalUserDto } from './serialize-minimal-user.dto';

export class SerializeUserDto extends SerializeMinimalUserDto {
  tickets: SerializeTicketDto[];
}
