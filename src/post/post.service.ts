import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async getPosts(): Promise<IPost[]> {
    try {
      const posts: IPost[] = await this.PostModel.find().exec();
      console.log({ posts })
      return posts;
    } catch (error) {
      return error;
    }
  }
}
