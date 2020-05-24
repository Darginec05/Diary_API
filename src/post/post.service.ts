import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) {}

  async addPost(body: any): Promise<any> {
    try {
      const { userId, post } = body;
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const postInstance = this.postRepository.create({ ...post, author: user });
      await this.postRepository.save(postInstance);
      return post;
    } catch (error) {
      return error;
    }
  }

  async getPosts(req: any, limit: number): Promise<any[]> {
    try {
      const MAX_LIMIT_POSTS_UNAUTH = 15;
      if(!req.user && limit > MAX_LIMIT_POSTS_UNAUTH) {
        throw new UnauthorizedException();
      };

      const posts = this.postRepository.find({
        relations: ['author'],
        take: 25,
      });
      return posts;
    } catch (error) {
      return error;      
    }
  }

  async getPostByID(post_id: string): Promise<any> {
    try {
      const post = await this.postRepository.findOne({ where: { id: post_id } });
      if (!post) {
        throw new HttpException('POST_NOT_FOUND', 404);
      }
      return post;
    } catch (error) {
      return error;
    }
  }
}
