import { IsUUID } from 'class-validator';

export class GetPostDTO {
  @IsUUID()
  post_id!: string;
}