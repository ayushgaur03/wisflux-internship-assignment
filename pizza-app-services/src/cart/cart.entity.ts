import { menu_ent } from 'src/menu/menu.entity';
import { users_ent } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart_ent')
export class cart_ent {
  @PrimaryGeneratedColumn('increment')
  cart_id: number;

  @ManyToOne(() => users_ent, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: users_ent;

  @Column({ type: 'numeric' })
  qty: number;

  @Column({ type: 'text' })
  size: string;

  @Column({ type: 'json' })
  add_on: object;

  @ManyToOne(() => menu_ent, (menu) => menu.id)
  @JoinColumn({ name: 'id' })
  menu_item: menu_ent;
}
