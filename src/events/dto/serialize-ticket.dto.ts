import { SerializeEventDto } from './serialize-event.dto';

export class SerializeTicketDto {
  id: number;
  seat: string;
  gate: string;
  event: SerializeEventDto;
}
