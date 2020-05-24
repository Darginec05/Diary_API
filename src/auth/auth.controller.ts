import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto/register.dto';
import { LoginUserDTO } from '../user/dto/login.dto';
import { ValidationPipe } from 'src/pipes/ValidationPipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() body: CreateUserDTO) {
    const payload = await this.authService.signup(body);
    return payload;
  }

  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signin(@Body() userData: LoginUserDTO) {
    const payload = await this.authService.signin(userData);
    return payload;
  }
}
