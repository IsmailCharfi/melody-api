import { IsNumber } from "class-validator";

export class GenerateTicketDto {
  @IsNumber()
  client: number;
}
