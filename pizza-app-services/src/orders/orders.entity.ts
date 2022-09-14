import { users_ent } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders_ent')
export class orders_ent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  invoice_no: number;

  @ManyToOne(() => users_ent, (users) => users.user_id)
  @JoinColumn({ name: 'user_id' })
  user: users_ent;

  @Column({ type: 'json' })
  ordered_items: object;

  @Column({ type: 'numeric' })
  amount: number;

  @Column({ type: 'date', default: new Date().toLocaleDateString() })
  order_date: Date;

  @Column()
  @UpdateDateColumn({ name: 'order_time' })
  order_time: Date;
}
