import { Controller, Post, Body, Get, Param, UseGuards, Req, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from 'src/guards/optional.auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async addPost(@Body() body: any): Promise<any> {
    const result = await this.postService.addPost(body);
    return result;
  }

  @Get('list')
  @UseGuards(new OptionalAuthGuard())
  async getPosts(@Req() req: any, @Query('limit') limit = 15): Promise<any> {
    const posts = await this.postService.getPosts(req, +limit);
    return posts;
  }

  @Get(':postId')
  @UseGuards(AuthGuard('jwt'))
  async getPostByID(@Param('postId') postId: string): Promise<any> {
    const post = await this.postService.getPostByID(postId);
    return post;
  }
}
