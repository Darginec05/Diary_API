import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/user/dto/register.dto';
import { LoginUserDTO } from 'src/user/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: CreateUserDTO) {
    const payload = await this.authService.signup(body);
    return payload;
  }

  @Post('signin')
  async signIn(@Body() userData: LoginUserDTO) {
    const payload = await this.authService.signin(userData);
    return payload;
  }
}
