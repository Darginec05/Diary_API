import { Module } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/post/post.entity';
import { ConfigModule } from 'src/config/config.module';
import { User } from 'src/user/user.entity';

const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: +!process.env.DB_PORT || 5432,
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      });
      sequelize.addModels([Post, User]);
      await sequelize.sync({ force: true });
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
