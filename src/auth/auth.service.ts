import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthResponse } from 'src/user/user.interface';
import { User } from 'src/user/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userData: any): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { username: userData.username } });
      console.log(user);
      if (user) {
        throw new HttpException('USER IS ALREADY EXISTS', HttpStatus.CONFLICT);
      }
      const someData = await this.userRepository.create({ ...userData, user_id: uuidv4() });
      const payload = { username: userData.username, id: userData.id };
      const token = this.jwtService.sign(payload);
      return { token, username: userData.username };
    } catch (error) {
      return error;
    }
  }

  async signIn(userData: any): Promise<IAuthResponse> {
    try {
      const user = await this.userRepository.findOne({ where: { username: userData.username } });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      const isValidPass = true; //[TODO] - add compare of password
      if (!isValidPass) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = { username: userData.username, id: userData.id };
      const token = this.jwtService.sign(payload);
      return { token, username: userData.username };
    } catch (error) {
      return error;
    }
  }
}
