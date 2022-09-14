import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { users_ent } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/orders.dto';
import { orders_ent } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(users_ent)
    private readonly userRepository: Repository<users_ent>,
    @InjectRepository(orders_ent)
    private readonly ordersRepository: Repository<orders_ent>,
  ) {}

  async getUserRecord(client_id: string): Promise<users_ent> {
    return await this.userRepository.findOne({
      where: {
        user_id: client_id,
      },
    });
  }

  async getOrders(client_id: string): Promise<orders_ent> {
    const client_account: users_ent = await this.getUserRecord(client_id);
    return await this.ordersRepository
      .createQueryBuilder('orders_ent')
      .where('orders_ent.user=:client', { client: client_account.id })
      .orderBy('orders_ent.id', 'DESC')
      .limit(1)
      .getOne();
  }

  async createOrder(body: CreateOrderDto) {
    let orderToSaveWithClient: users_ent;
    const client_account: users_ent = await this.getUserRecord(body.user_id);

    if (client_account === undefined) {
      return 'No User found';
    } else {
      orderToSaveWithClient = client_account;
    }

    return await this.ordersRepository.save({
      invoice_no: Date.now(),
      amount: body.amount,
      ordered_items: body.ordered_items,
      user: orderToSaveWithClient,
    });
  }
}
