import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserRequest } from 'src/auth/auth.interface';
import { UserDataResponse } from './user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}
  
  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  async getUserData(@Req() req: AuthUserRequest): Promise<UserDataResponse> {
    const userData = await this.userService.getUserData(req.user?.username);
    return userData;
  }
}