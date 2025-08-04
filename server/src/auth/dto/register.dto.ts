import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../users/users.model';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['contributor', 'volunteer'])
  role: UserRole;
}
