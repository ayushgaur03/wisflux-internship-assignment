import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { users_ent } from './users.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([users_ent])],
  providers: [UsersService],
})
export class UsersModule {}
