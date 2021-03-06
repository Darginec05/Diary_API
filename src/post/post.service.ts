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
import { AuthUser } from 'src/auth/auth.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async addPost(user_id: string | undefined, body: CreatePostDTO): Promise<Pick<PostResponse, 'id'>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: user_id },
      });
      const postInstance = this.postRepository.create({
        ...body,
        author: user,
      });
      const { id } = await this.postRepository.save(postInstance);
      return { id };
    } catch (error) {
      return error;
    }
  }

  async getPosts(user: AuthUser | undefined, query: any): Promise<PostResponse[]> {
    try {
      const MAX_LIMIT_POSTS_UNAUTH = 15;
      if (!user && query.limit > MAX_LIMIT_POSTS_UNAUTH) {
        throw new UnauthorizedException();
      }

      const posts = await this.postRepository.find({
        relations: ['author'],
        take: query.limit,
        order: { created_at: 'DESC' },
        where: { isAnonym: false }
      });

      const userPosts = posts.map(post => ({
        ...post,
        author: { id: post.author.id, username: post.author.username },
      }))
      return userPosts;
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

  async deletePost(post_id: string) {
    try {
      const post = await this.postRepository.findOne({
        where: { id: post_id },
      });
      if (!post) {
        throw new HttpException('POST_NOT_FOUND', 404);
      }
      await this.postRepository.remove(post);
    } catch (error) {
      return error;
    }
  }
}
