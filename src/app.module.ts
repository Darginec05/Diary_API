import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigService } from './config/config.service';
import { TokenService } from './token/token.service';
import { TokenController } from './token/token.controller';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PostModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TokenModule,
  ],
  providers: [TokenService],
  controllers: [TokenController],
})
export class AppModule {}
