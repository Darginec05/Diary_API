import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  
  @Get('posts')
  async getUserPosts() {
    await Promise.resolve();
  }

  @Get('profile')
  async getUserProfile() {
    await Promise.resolve();
  }
}
