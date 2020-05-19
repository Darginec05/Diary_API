import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IUser } from 'src/user/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userData: IUser) {
    const payload = await this.authService.signUp(userData);
    return payload;
  }

  @Post('signin')
  async signIn(@Body() userData: any) {
    await this.authService.signIn(userData);
  }
}
