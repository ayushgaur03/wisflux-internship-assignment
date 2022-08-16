enum category_values {
  "veg",
  "nonveg",
  "sides",
  "beverage",
}

export interface pizza_item {
  id: string;
  name: string;
  dscrptn: string;
  price: number;
  category: category_values;
  used_in_pizza: object;
  img_location: string;
}
