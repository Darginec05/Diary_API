import { Controller, Post, Body, Get, Param, UseGuards, Req, Query, UsePipes, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { OptionalAuthGuard } from '../guards/optional.auth.guard';
import { CreatePostDTO } from './dto/create.post.dto';
import { PostResponse, Post as IPost } from './post.interface';
// import { GetPostDTO } from './dto/get.post.dto';
import { AuthUserRequest } from '../auth/auth.interface';
import { ValidationPipe } from 'src/pipes/ValidationPipe';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('add')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async addPost(@Req() req: AuthUserRequest, @Body() body: CreatePostDTO): Promise<Pick<PostResponse, 'id'>> {
    const result = await this.postService.addPost(req.user?.id, body);
    return result;
  }

  @Get('list')
  @UseGuards(new OptionalAuthGuard())
  async getPosts(@Req() req: AuthUserRequest, @Query() query: any): Promise<PostResponse[]> {
    const posts = await this.postService.getPosts(req.user, query);
    return posts;
  }

  @Get(':postId')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async getPostByID(@Param() params: any): Promise<IPost> {
    const post = await this.postService.getPostByID(params.postId);
    return post;
  }

  @Delete(':postId')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  async deletePost(@Param() params: any): Promise<void> {
    await this.postService.deletePost(params.postId);
  }
}
