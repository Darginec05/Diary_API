import { IsUUID } from 'class-validator';

export class GetPostDTO {
  @IsUUID()
  postId!: string;
}