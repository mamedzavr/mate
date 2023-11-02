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
