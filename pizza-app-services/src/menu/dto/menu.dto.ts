import { FoodCatType } from '../menu.entity';

export class MenuDto {
  name: string;
  dscrptn: string;
  price: number;
  category: FoodCatType;
  used_in_pizza: object;
  serving: boolean;
  img_location: string;
}
