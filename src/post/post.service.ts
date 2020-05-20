import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { IPost } from './post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly PostModel: Model<IPost>) {}

  async addPost(body: any): Promise<IPost> {
    try {
      const { userId, post } = body;
      const newPost: IPost = new this.PostModel({ ...post, postedBy: userId });
      const result = await newPost.save();
      return result;
    } catch (error) {
      return error;
    }
  }

  async getPosts(req: any, limit: number): Promise<IPost[]> {
    try {
      const MAX_LIMIT_POSTS_UNAUTH = 15;

      if(!req.user && limit > MAX_LIMIT_POSTS_UNAUTH) {
        throw new UnauthorizedException();
      }

      const posts: IPost[] = await this.PostModel.find().limit(limit).exec();
      return posts;
    } catch (error) {
      return error;
    }
  }

  async getPostByID(postId: string): Promise<IPost> {
    try {
      //[TODO] - add better validation
      if (!postId || !isValidObjectId(postId)) {
        throw new HttpException('NOT_VALID_OBJECT_ID', 400);
      }
      
      const post = await this.PostModel.findById(postId).exec();
      if (!post) {
        throw new HttpException('POST_NOT_FOUND', 404);
      }
      return post;
    } catch (error) {
      return error;
    }
  }
}
