import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './login.dto';
import { IsNotEmpty, Length } from 'class-validator';

export class RegisterDto extends PartialType(LoginDto) {
  @IsNotEmpty()
  @Length(3)
  name: string;
}
