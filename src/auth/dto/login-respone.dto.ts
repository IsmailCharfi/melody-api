import { SerializeUserDto } from 'src/auth/dto/serialize-user.dto';

export class LoginResponeDto {
  token: string;
  user: SerializeUserDto;
}
