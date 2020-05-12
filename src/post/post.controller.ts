import { Controller, Post, Body, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from './post.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('add')
  async addPost(@Body() body: IPost): Promise<string> {
    const resultId: string = await this.postService.addPost(body);
    return resultId;
  }

  @Get('all')
  async getPosts(): Promise<IPost[]> {
    const posts = await this.postService.getPosts();
    return posts;
  }
}
