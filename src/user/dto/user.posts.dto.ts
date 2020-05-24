import { IsString, IsNotEmpty } from 'class-validator';

export class UserPostsDTO {
  @IsString()
  @IsNotEmpty()
  username!: string;
}