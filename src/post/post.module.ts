import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { Post } from './post.entity';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'POST_REPOSITORY',
      useValue: Post,
    },
  ],
})
export class PostModule {}
