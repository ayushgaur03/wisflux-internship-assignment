import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { menu_ent } from 'src/menu/menu.entity';
import { users_ent } from 'src/users/users.entity';
import { CartController } from './cart.controller';
import { cart_ent } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  imports: [TypeOrmModule.forFeature([cart_ent, menu_ent, users_ent])],
  providers: [CartService],
})
export class CartModule {}
