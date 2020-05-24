import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
  
  @IsString()
  @IsOptional()
  image_uri?: string | null;
  
  @IsBoolean()
  @IsOptional()
  isAnonym?: boolean;
}
