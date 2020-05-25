import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthUserRequest } from 'src/auth/auth.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService){}

  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  async updateProfile(@Req() req: AuthUserRequest, @Body() body: any) {
    await this.profileService.updateProfile(req.user?.id, body);
  }
}
