import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type FoodCatType = 'veg' | 'nonveg' | 'sides' | 'beverage';

@Entity('menu_ent')
export class menu_ent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  dscrptn: string;

  @Column({ type: 'int4' })
  price: number;

  @Column({ type: 'enum', enum: ['veg', 'nonveg', 'sides', 'beverage'] })
  category: FoodCatType;

  @Column({ type: 'json' })
  used_in_pizza: object;

  @Column({ type: 'bool' })
  serving: boolean;

  @Column({ type: 'text' })
  img_location: string;
}
