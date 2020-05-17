import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { IPost } from './post.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('add')
  async addPost(@Body() body: IPost): Promise<string> {
    const resultId: string = await this.postService.addPost(body);
    return resultId;
  }

  @Get('all')
  @UseGuards(AuthGuard())
  async getPosts(@Req() req: any): Promise<IPost[]> {
    const posts = await this.postService.getPosts(req);
    return posts;
  }

  @Get('get/:postId')
  async getPostByID(@Param('postId') postId: string): Promise<IPost> {
    const post = await this.postService.getPostByID(postId);
    return post;
  }
}
