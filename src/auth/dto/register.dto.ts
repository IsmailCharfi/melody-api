import { CredenialsDto } from 'src/auth/dto/credenials.dto';

export class RegisterDto extends CredenialsDto {
  firstname: string;
  lastname: string;
}
