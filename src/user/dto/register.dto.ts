import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}