import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDataResponse } from './user.interface';
import { AuthUser } from 'src/auth/auth.interface';
import { Post } from 'src/post/post.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getUserData(
    authUser: AuthUser | undefined,
    username: string,
  ): Promise<UserDataResponse> {
    const isOwner = authUser?.username === username;
    console.log({ isOwner })
    try {
      const user = await this.userRepository.findOne({
        where: { username },
        relations: ['posts', 'profile'],
      });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const { profile, posts } = user;

      return {
        profile: {
          username: user.username,
          bio: profile?.bio,
          avatar: profile?.avatar,
        },
        posts: isOwner ? posts : posts.filter(post => !post.isAnonym),
      };
    } catch (error) {
      return error;
    }
  }
}
