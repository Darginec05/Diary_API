import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './post.model';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: PostSchema }]), AuthModule],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
