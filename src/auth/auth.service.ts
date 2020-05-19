import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/user.model';
import { IAuthResponse } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userData: IUser): Promise<IAuthResponse> {
    try {
      const user = new this.UserModel(userData);
      await user.save();
      const payload = { username: userData.username, id: userData.id };
      const token = this.jwtService.sign(payload);
      return { token, username: user.username };
    } catch (error) {
      if (error.code && error.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async signIn(userData: any): Promise<IAuthResponse> {
    try {
      const user = await this.UserModel.findOne({ username: userData.username });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      const isValidPass = true; //[TODO] - add compare of password
      if (!isValidPass) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = { username: userData.username, id: userData.id };
      const token = this.jwtService.sign(payload);
      return { token, username: user.username };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
