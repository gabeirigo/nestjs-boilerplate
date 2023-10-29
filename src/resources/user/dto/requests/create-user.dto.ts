import { Role } from '@prisma/client';
import { IsDefined, IsEmail, IsString } from 'class-validator';
import { User } from '../../entities/user.entity';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  awsId: string;

  @IsString()
  nickname: string;

  @IsDefined()
  role: Role;
}
