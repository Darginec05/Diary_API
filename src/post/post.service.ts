import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { IPost } from './post.model';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly PostModel: Model<IPost>) {}

  async addPost(body: IPost): Promise<string> {
    try {
      const post = new this.PostModel(body);
      const result = await post.save();
      return result.id;
    } catch (error) {
      return error;
    }
  }

  async getPosts(req: any): Promise<IPost[]> {
    console.log(req.user);
    try {
      const posts: IPost[] = await this.PostModel.find().exec();
      return posts;
    } catch (error) {
      return error;
    }
  }

  async getPostByID(postId: string): Promise<IPost> {
    try {
      //[TODO] - add better validation
      if (!isValidObjectId(postId)) {
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
