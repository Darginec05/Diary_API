import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/post/post.entity';
import { ConfigModule } from 'src/config/config.module';
import { User } from 'src/user/user.entity';

const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: +!process.env.DB_PORT,
      });
      sequelize.addModels([Post, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
