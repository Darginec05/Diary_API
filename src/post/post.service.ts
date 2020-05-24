import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserEntity } from '../user/user.entity';
import { CreatePostDTO } from './dto/create.post.dto';
import { PostResponse, Post } from './post.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async addPost(body: CreatePostDTO): Promise<PostResponse> {
    try {
      const { user_id, post } = body;
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      const postInstance = this.postRepository.create({
        ...post,
        author: user,
      });
      const created = await this.postRepository.save(postInstance);
      return created;
    } catch (error) {
      return error;
    }
  }

  async getPosts(user: any, limit: number): Promise<PostResponse[]> {
    try {
      const MAX_LIMIT_POSTS_UNAUTH = 15;
      if (!user && limit > MAX_LIMIT_POSTS_UNAUTH) {
        throw new UnauthorizedException();
      }

      const posts = await this.postRepository.find({
        relations: ['author'],
        take: 25,
      });

      const response = posts.map(post => ({
        ...post,
        author: { id: post.author.id, username: post.author.username },
      }));
      return response;
    } catch (error) {
      return error;
    }
  }

  async getPostByID(post_id: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { id: post_id },
      });
      if (!post) {
        throw new HttpException('POST_NOT_FOUND', 404);
      }
      return post;
    } catch (error) {
      return error;
    }
  }
}
