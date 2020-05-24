import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Post } from 'src/post/post.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  async getMyPosts(username: string | undefined): Promise<Post[]> {
    try {
      const user = await this.userRepository.findOne({ where: { username }, relations: ['posts'] });
      if(!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      return user.posts;
    } catch (error) {
      return error;      
    }
  }
}