import { Injectable } from '@angular/core';
import { Dish, Order, OrderItem } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private items: { [key: string]: OrderItem } = {};

  addItem(item: Dish): void {
    if (this.items[item.name]) {
      this.items[item.name].quantity++;
    } else {
      this.items[item.name] = { dish: item, quantity: 1 };
    }
  }

  removeItem(item: Dish): void {
    if (this.items[item.name] && this.items[item.name].quantity > 0) {
      this.items[item.name].quantity--;
      if (this.items[item.name].quantity === 0) {
        delete this.items[item.name];
      }
    }
  }

  getItems(): { [key: string]: OrderItem } {
    return this.items;
  }

  hasItems(): boolean {
    return Object.keys(this.items).length > 0;
  }

  getOrder(): Order {
    let total = 0;
    let items: OrderItem[] = [];
    for (let key in this.items) {
      items.push(this.items[key]);
      total += this.items[key].dish.price * this.items[key].quantity;
    }
    let serviceFee = total * 0.1; // replace 0.1 with your actual service fee percentage
    let finalTotal = total + serviceFee;
    return { items, total, serviceFee, finalTotal };
  }
}
