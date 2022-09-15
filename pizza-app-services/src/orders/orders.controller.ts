import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDto } from './dto/orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async getLatestOrder(
    @Headers('user_id') header: string,
    @Res() response: Response,
  ) {
    if (header === undefined)
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('Please provide the HEADER !!');
    return response
      .status(200)
      .send(await this.ordersService.getOrders(header));
  }

  @Post()
  async createOrder(
    @Body() body: CreateOrderDto,
    @Headers('user_id') header: string,
    @Res() response: Response,
  ) {
    if (header === undefined)
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('Please provide the HEADER !!');
    const status: string = await this.ordersService.createOrder(body, header);
    if (status === 'OK')
      response
        .status(HttpStatus.CREATED)
        .send('Order has been created succesfully');
    else
      response
        .status(HttpStatus.BAD_REQUEST)
        .send('Your order could not be placed!!');
  }
}
