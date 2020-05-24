import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthResponse } from './auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDTO } from 'src/user/dto/login.dto';
import { CreateUserDTO } from 'src/user/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signup(body: CreateUserDTO): Promise<IAuthResponse> {
    try {
      const { username } = body;
      const user = await this.userRepository.findOne({ where: { username } });
      if (user) {
        throw new HttpException('USER ALREADY EXISTS', HttpStatus.BAD_REQUEST);
      }

      const userInstance = this.userRepository.create(body);
      const results = await this.userRepository.save(userInstance);
      const payload = { username, id: results.id };
      const token = this.jwtService.sign(payload);
      return { token, username };
    } catch (error) {
      return error;
    }
  }

  async signin(body: LoginUserDTO): Promise<IAuthResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: body.username },
      });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const isValidPassword = await user.comparePassword(body.password);
      if (!isValidPassword) {
        throw new UnauthorizedException('INVALID PASSWORD');
      }

      const payload = { username: user.username, id: user.id };
      const token = this.jwtService.sign(payload);
      return { token, username: user.username };
    } catch (error) {
      return error;
    }
  }
}
