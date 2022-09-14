import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getLatestOrder(@Headers('user_id') header: string) {
    return this.ordersService.getOrders(header);
  }

  @Post()
  createOrder(@Body() body: CreateOrderDto) {
    this.ordersService.createOrder(body);
  }
}
