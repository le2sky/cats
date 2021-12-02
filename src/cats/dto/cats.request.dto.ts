import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
