import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { menu_ent } from 'src/menu/menu.entity';
import { users_ent } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { createOrderDto } from './dto/createOrder.dto';
import { cart_ent } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(cart_ent)
    private readonly cartRepository: Repository<cart_ent>,

    @InjectRepository(menu_ent)
    private readonly menuRepository: Repository<menu_ent>,

    @InjectRepository(users_ent)
    private readonly userRepository: Repository<users_ent>,
  ) {}

  async getUserRecord(client_id: string): Promise<any> {
    try {
      return await this.userRepository.findOne({
        where: {
          user_id: client_id,
        },
      });
    } catch (err) {
      return '';
    }
  }

  async getMenuItem(menu_id: number): Promise<any> {
    try {
      return await this.menuRepository.findOne({
        where: {
          id: menu_id,
        },
      });
    } catch (err) {
      return '';
    }
  }

  async fetchCart(client_id: string): Promise<any> {
    const user_obj = await this.getUserRecord(client_id);

    try {
      return await this.cartRepository
        .createQueryBuilder('cart_ent')
        .leftJoinAndSelect('cart_ent.menu_item', 'menu_ent')
        .where('cart_ent.user=:user', { user: user_obj.id })
        .getMany();
    } catch (err) {
      console.log(err);
      return 'ERR';
    }
  }

  async addToCart(dto: createOrderDto, client_id: string): Promise<string> {
    const user_record = await this.getUserRecord(client_id);
    const menu_record = await this.getMenuItem(dto.menu_item);
    if (user_record === undefined) {
      return 'ERR';
    } else {
      this.cartRepository.save({
        user: user_record,
        menu_item: menu_record,
        qty: dto.qty,
        size: dto.size,
        add_on: dto.add_on,
      });
      return 'OK';
    }
  }

  async updateCart(cart_id: number, qty: number, client_id: string) {
    let user_entry: users_ent;
    let cart_ent;
    const user_obj = await this.getUserRecord(client_id);

    if (user_obj === undefined) {
      return 'UNAUTHORIZED';
    } else {
      user_entry = user_obj;
    }

    try {
      await this.cartRepository
        .createQueryBuilder()
        .update(cart_ent)
        .set({
          qty: () => `${qty}`,
        })
        .where('cart_ent.cart_id=:id', { id: cart_id })
        .andWhere('cart_ent.user_id=:user', { user: user_entry.id })
        .execute();
    } catch (err) {
      console.log(err);
      return 'ERR';
    }

    return 'OK';
  }

  async deleteCartItem(client_id: string, cart_id: number): Promise<string> {
    let user_entry: users_ent;
    let cart_ent;
    const user_obj = await this.getUserRecord(client_id);
    console.log(user_obj);
    if (user_obj === undefined) {
      return 'UNAUTHORIZED';
    } else {
      user_entry = user_obj;
    }
    console.log(client_id + ' ' + cart_id);
    try {
      await this.cartRepository
        .createQueryBuilder()
        .delete()
        .from('cart_ent')
        .where('cart_id = :id', { id: cart_id })
        .andWhere('user=:user', { user: user_entry.id })
        .execute();
    } catch (err) {
      console.log(err);
      return 'ERR';
    }

    return 'OK';
  }
}
