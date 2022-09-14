import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users_ent } from 'src/users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [users_ent],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
