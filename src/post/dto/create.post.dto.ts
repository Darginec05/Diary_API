import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PostDTO {
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
};

export class CreatePostDTO {
  @ValidateNested()
  @Type(() => PostDTO)
  post!: PostDTO;

  @IsUUID()
  user_id!: string;
}
