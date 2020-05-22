import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userData: any) {
    const payload = await this.authService.signUp(userData);
    return payload;
  }

  @Post('signin')
  async signIn(@Body() userData: any) {
    const payload = await this.authService.signIn(userData);
    return payload;
  }
}
