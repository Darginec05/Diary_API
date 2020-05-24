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
      // const newPost = await this.postRepository.create({});
      // const newPost: IPost = new this.PostModel({ ...post, postedBy: userId });
      // const result = await newPost.save();
      // return result;
    } catch (error) {
      return error;
    }
  }

  async getPosts(req: any, limit: number): Promise<any[]> {
    // const posts = this.postRepository.findAll<Post>();
    return [];

    // try {
    //   const MAX_LIMIT_POSTS_UNAUTH = 15;

    //   if(!req.user && limit > MAX_LIMIT_POSTS_UNAUTH) {
    //     throw new UnauthorizedException();
    //   }

    //   const posts: IPost[] = await this.PostModel.find().limit(limit).exec();
    //   return posts;
    // } catch (error) {
    //   return error;
    // }
  }

  async getPostByID(post_id: string): Promise<any> {
    try {
      //[TODO] - add validation for uuid
      // const post = await this.postRepository.findOne({ where: { post_id } });
      // if (!post) {
      //   throw new HttpException('POST_NOT_FOUND', 404);
      // }
      // return post;
    } catch (error) {
      return error;
    }
  }
}
