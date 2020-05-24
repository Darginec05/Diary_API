import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: any) {
    const payload = await this.authService.signup(body);
    return payload;
  }

  @Post('signin')
  async signIn(@Body() userData: any) {
    const payload = await this.authService.signin(userData);
    return payload;
  }
}
