import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserRequest } from 'src/auth/auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}
  
  @Get('my/posts')
  @UseGuards(AuthGuard('jwt'))
  async getMyPosts(@Req() req: AuthUserRequest) {
    const posts = await this.userService.getMyPosts(req.user?.username);
    return posts;
  }
}