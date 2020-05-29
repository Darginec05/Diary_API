import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUserRequest } from 'src/auth/auth.interface';
import { UserDataResponse } from './user.interface';
import { OptionalAuthGuard } from 'src/guards/optional.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}
  
  @Get('data/:username')
  @UseGuards(new OptionalAuthGuard())
  async getUserData(@Req() req: AuthUserRequest, @Param() params: any): Promise<UserDataResponse> {
    const userData = await this.userService.getUserData(req.user, params.username);
    return userData;
  }
}