export interface Ingredient {
  name: string;
}

export interface Dish {
  name: string;
  price: number;
  ingredients: Ingredient[];
  category: string;
  imageUrl: string; 
}

export interface OrderItem {
  dish: Dish;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  total: number;
  serviceFee: number;
  finalTotal: number;
}