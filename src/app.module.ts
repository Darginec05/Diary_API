import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';

//Temporary: https://stackoverflow.com/questions/45088006/nodejs-error-self-signed-certificate-in-certificate-chain/45088585
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +!process.env.DB_PORT || 5432,
      synchronize: false,
      logging: false,
      dropSchema: false,
      migrationsTableName: 'migration_table',
      migrations: ["migration/*.js"],
      cli: {
        migrationsDir: "migration"
      },
      extra: {
        ssl: true,
        rejectUnauthorized: false,
      },
      entities: [process.env.NODE_ENV === 'production' ? 'dist/**/*.entity.js' : 'src/**/*.entity.ts'],
    }),
    ConfigModule,
    UserModule,
    PostModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
