import { Component } from '@angular/core';
import { Dish } from '../../models/menu.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent {
  constructor(public basketService: BasketService) {}

  soupItems: Dish[] = [
    {
      name: 'Miso soup',
      price: 7.4,
      ingredients: [
        { name: 'Miso Baza' },
        { name: 'wakame' },
        { name: 'tofu' },
        { name: 'sesame(кунжут)' },
        { name: 'Green Onion' },
      ],
      imageUrl: 'assets/images/dishes/DALL·E Miso Soup.png',
      category: 'Soup',
    },
    {
      name: 'Tom Yum',
      price: 15,
      ingredients: [
        { name: 'Tom Yum baza' },
        { name: 'Mushrooms' },
        { name: 'Shitaki' },
        { name: 'Shrimps' },
        { name: 'Seafood' },
        { name: 'Green Onion' },
      ],
      imageUrl: 'assets/images/dishes/DALL·E Tom Yum Soup.png',
      category: 'Soup',
    },
    {
      name: 'Udon Soup',
      price: 11,
      ingredients: [
        { name: 'Udon baza' },
        { name: 'Shrimps' },
        { name: 'Bell Pepper' },
        { name: 'Mushroom' },
        { name: 'Green Onion' },
        { name: 'Udon Baza' }, // Note: "Udon baza" is repeated, ensure it's intentional.
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Soup',
    },
    {
      name: 'Miso salmon',
      price: 14,
      ingredients: [
        { name: 'Salmon' },
        { name: 'Miso Baza' },
        { name: 'wakame' },
        { name: 'Tofu' },
        { name: 'Sesame' },
        { name: 'Green Onion' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Soup',
    },
    {
      name: 'Spice soup',
      price: 9.2,
      ingredients: [
        { name: 'Spice soup baza' },
        { name: 'Mushrooms' },
        { name: 'Shitaki' },
        { name: 'Chicken' },
        { name: 'Starch' },
        { name: 'Egg' },
        { name: 'Green Onion' },
        { name: 'Baby Corn' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Soup',
    },
  ];

  saradaItems: Dish[] = [
    {
      name: 'Japan Sarada',
      price: 15,
      ingredients: [
        { name: 'red cabbage' },
        { name: 'Avocado' },
        { name: 'Orange' },
        { name: 'Chicken' },
        { name: 'Sweet Chilly' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'Kappa Sarada',
      price: 9,
      ingredients: [
        { name: 'Cucumber' },
        { name: 'Keshyu' },
        { name: 'Sesame' },
        { name: 'Cucumber sarada' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'Crab Sarada',
      price: 11,
      ingredients: [
        { name: 'Surimi' },
        { name: 'american garden' },
        { name: 'Cucumber' },
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'lettuce' },
        { name: 'Red lettuce' },
        { name: 'Tobiko' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'Green Harmony sarada',
      price: 7,
      ingredients: [
        { name: 'Cucumber' },
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'Lettuce' },
        { name: 'Lettuce red' },
        { name: 'Sarada Sauce' },
        { name: 'tomato' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'Smoked Salmon sarada',
      price: 17,
      ingredients: [
        { name: 'Smoked Salmon' },
        { name: 'Iceberg' },
        { name: 'Cherry' },
        { name: 'Honey mustard sauce' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'Chuka sarada',
      price: 8,
      ingredients: [
        { name: 'Chuka' },
        { name: 'Kaiso Sauce' },
        { name: 'Sesame' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'CHICKEN CRISPY SARADA',
      price: 13,
      ingredients: [
        { name: 'Chicken' },
        { name: 'Cucumber' },
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'lettuce' },
        { name: 'lettuce red' },
        { name: 'Sarada Sauce' },
        { name: 'tomat' },
        { name: 'Shitaki' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
    {
      name: 'Sea oasis salad',
      price: 16,
      ingredients: [
        { name: 'Seafood' },
        { name: 'Shrimps' },
        { name: 'Cucumber' },
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'lettuce' },
        { name: 'lettuce red' },
        { name: 'Sarada Sauce' },
        { name: 'Cherry' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Sarada',
    },
  ];

  starterItems: Dish[] = [
    {
      name: 'Crispy Eggplant',
      price: 7,
      ingredients: [
        { name: 'Starch' },
        { name: 'eggplant' },
        { name: 'Sauce' },
        { name: 'tomatoes' },
        { name: 'Green Onion' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Edamame classic',
      price: 7,
      ingredients: [{ name: 'Edamame' }, { name: 'Salt' }],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Edamame spicy',
      price: 8,
      ingredients: [
        { name: 'Edamame' },
        { name: 'Salt' },
        { name: 'Kimchi sauce' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Calamari tempura',
      price: 11,
      ingredients: [
        { name: 'Calamari' },
        { name: 'Tempura' },
        { name: 'Panko' },
        { name: 'Sweet chilly' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Ebi Tempura',
      price: 13,
      ingredients: [
        { name: 'Shrimps' },
        { name: 'Tempura' },
        { name: 'Panko' },
        { name: 'Sweet chilly' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Shrimps popcorn',
      price: 13.5,
      ingredients: [
        { name: 'Dynamic Sauce' },
        { name: 'Shrimps' },
        { name: 'Tempura' },
        { name: 'Starch' },
        { name: 'Green Onion' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Avocado Tempura',
      price: 9, // Note: As per your list, the composition was not agreed upon
      ingredients: [
        { name: 'Avocado' },
        { name: 'Tempura' },
        { name: 'Panko' },
        { name: 'Sweet Chilly' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Gyoza chicken (6 pc)',
      price: 11,
      ingredients: [
        { name: 'gyoza testo' },
        { name: 'chicken' },
        { name: 'tataki sauce' },
        { name: 'Green Onion' },
        { name: 'Sesame' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
    {
      name: 'Gyoza seafood (6 pc)',
      price: 12,
      ingredients: [], // Ingredients not provided
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Starter',
    },
  ];

  noodlesItems: Dish[] = [
    {
      name: 'Chicken Noodle',
      price: 15,
      ingredients: [
        { name: 'Chicken' },
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'Noodle' },
        { name: 'Sauce' },
        { name: 'Green Onion' },
        { name: 'Sesame' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Noodles',
    },
    {
      name: 'Seafood noodle',
      price: 16,
      ingredients: [
        { name: 'Shrimps' },
        { name: 'Seafood' },
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'Noodle' },
        { name: 'Sauce' },
        { name: 'Green Onion' },
        { name: 'Sesame' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Noodles',
    },
    {
      name: 'Chicken Don Noodle',
      price: 14,
      ingredients: [
        { name: 'Chicken' },
        { name: 'Tai tai' },
        { name: 'Egg' },
        { name: 'Bell Pepper' },
        { name: 'Keshyu' },
        { name: 'Don Sauce' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Noodles',
    },
    {
      name: 'Shrimps Don Noodle',
      price: 15,
      ingredients: [
        { name: 'Shrimps' },
        { name: 'Tai tai' },
        { name: 'Egg' },
        { name: 'Bell Pepper' },
        { name: 'Keshyu' },
        { name: 'Don Sauce' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Noodles',
    },
    {
      name: 'Vegetable Noodle',
      price: 12,
      ingredients: [
        { name: 'Cabbage' },
        { name: 'Red Cabbage' },
        { name: 'Carrot' },
        { name: 'Noodle' },
        { name: 'Sauce' },
        { name: 'Green Onion' },
        { name: 'Sesame' },
      ],
      imageUrl: 'assets/images/icons/mate_logo.png',
      category: 'Noodles',
    },
  ];

  menuItems = [
    ...this.soupItems,
    ...this.saradaItems,
    ...this.starterItems,
    ...this.noodlesItems,
  ];

  categories: string[] = [
    ...new Set(this.menuItems.map(item => item.category)),
  ];

  getItemsByCategory(category: string): Dish[] {
    return this.menuItems.filter(item => item.category === category);
  }

  ngOnInit(): void {}
}
