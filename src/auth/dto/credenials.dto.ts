import { IsEmail, IsNotEmpty } from 'class-validator';

export class CredenialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
