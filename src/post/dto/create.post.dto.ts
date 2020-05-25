import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

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

  @IsDateString()
  created_at!: Date;

  @IsDateString()
  updated_at!: Date;
}
