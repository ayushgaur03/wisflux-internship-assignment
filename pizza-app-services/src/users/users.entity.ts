import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_ent')
export class users_ent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @Generated('uuid')
  user_id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  mobile_no: string;
}
