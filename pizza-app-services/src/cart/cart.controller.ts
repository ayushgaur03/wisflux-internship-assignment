import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CartService } from './cart.service';
import { createOrderDto } from './dto/createOrder.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async fetchCart(
    @Headers('user_id') header: string,
    @Res() response: Response,
  ) {
    const cart_entries = await this.cartService.fetchCart(header);

    if (cart_entries === 'ERR') {
      response.status(HttpStatus.BAD_REQUEST).send('Error is found!!');
    } else {
      return response.status(HttpStatus.OK).json(cart_entries);
    }
  }

  @Post()
  async addToCart(
    @Body() reqBody: createOrderDto,
    @Headers('user_id') header: string,
    @Res() response: Response,
  ) {
    const status = await this.cartService.addToCart(reqBody, header);

    if (status === 'ERR') {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Your cart could not be updated');
    } else {
      return response
        .status(HttpStatus.CREATED)
        .send('Item added to the user cart');
    }
  }

  @Put('/:id/:qty')
  async updateCart(
    @Headers('user_id') header: string,
    @Param() params: { id: number; qty: number },
    @Res() response: Response,
  ) {
    console.log(params);
    const status = await this.cartService.updateCart(
      params.id,
      params.qty,
      header,
    );

    if (status === 'UNAUTHORIZED')
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('User not authorized');
    else if (status === 'ERR')
      response.status(HttpStatus.BAD_REQUEST).send('System error');
    else
      response.status(HttpStatus.ACCEPTED).send('Updated the qty successfully');
  }

  @Delete('/:id')
  async deleteCartItem(
    @Headers('user_id') header: string,
    @Param('id') param: number,
    @Res() response: Response,
  ) {
    const status = await this.cartService.deleteCartItem(header, param);
    if (header === undefined && status === 'UNAUTHORIZED')
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('User not authorized');
    else if (status === 'ERR')
      return response.status(HttpStatus.BAD_REQUEST).send('System error');
    else
      return response
        .status(HttpStatus.ACCEPTED)
        .send('Updated the qty successfully');
  }
}
