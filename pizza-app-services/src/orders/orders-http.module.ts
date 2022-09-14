import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { orders_ent } from './orders.entity';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([orders_ent])],
  providers: [OrdersService],
})
export class OrdersHttpModule {}
