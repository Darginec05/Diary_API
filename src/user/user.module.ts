import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './user.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useValue: User,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
