import { IsNumber, IsString } from 'class-validator';

export class EventCreationDto {
  @IsString()
  name: string;
  @IsNumber()
  capacity: number;
  @IsString()
  place: string;
  @IsString()
  description: string;
  @IsString()
  artist: string;
  @IsString()
  image: string;
  @IsString()
  artistImage: string;
  @IsString()
  date: string;
  @IsString()
  category: string;
}
