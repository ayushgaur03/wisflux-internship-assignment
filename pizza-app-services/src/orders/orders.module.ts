import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users_ent } from 'src/users/users.entity';
import { OrdersController } from './orders.controller';
import { orders_ent } from './orders.entity';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  imports: [
    TypeOrmModule.forFeature([orders_ent]),
    TypeOrmModule.forFeature([users_ent]),
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
