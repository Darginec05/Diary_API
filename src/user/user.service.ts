import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDataResponse } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserData(_username: string | undefined): Promise<UserDataResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { username: _username },
        relations: ['posts', 'profile'],
      });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      const { profile, posts, username } = user;
      return {
        posts,
        profile: { username, bio: profile?.bio, avatar: profile?.avatar },
      };
    } catch (error) {
      return error;
    }
  }
}
