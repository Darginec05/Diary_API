import {
  Injectable,
  HttpException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY') private readonly postRepository: typeof Post,
  ) {}

  async addPost(body: any): Promise<any> {
    try {
      const { userId, post } = body;
      const newPost = await this.postRepository.create({});
      // const newPost: IPost = new this.PostModel({ ...post, postedBy: userId });
      // const result = await newPost.save();
      // return result;
    } catch (error) {
      return error;
    }
  }

  async getPosts(req: any, limit: number): Promise<Post[]> {
    const posts = this.postRepository.findAll<Post>();
    return posts;

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

  async getPostByID(post_id: string): Promise<Post> {
    try {
      //[TODO] - add validation for uuid
      const post = await this.postRepository.findOne({ where: { post_id } });
      if (!post) {
        throw new HttpException('POST_NOT_FOUND', 404);
      }
      return post;
    } catch (error) {
      return error;
    }
  }
}
