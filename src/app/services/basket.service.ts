import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish, Order, OrderItem } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private itemsSubject = new BehaviorSubject<{ [key: string]: OrderItem }>({});

  get items$() {
    return this.itemsSubject.asObservable();
  }

  get order$() {
    return this.items$.pipe(
      map(items => {
        const itemsArray: OrderItem[] = Object.values(items);
        const total = itemsArray.reduce(
          (sum, item) => sum + item.dish.price * item.quantity,
          0,
        );
        return { items: itemsArray, total };
      }),
    );
  }

  addItem(item: Dish): void {
    const items = this.itemsSubject.getValue();
    if (items[item.name]) {
      items[item.name].quantity++;
    } else {
      items[item.name] = { dish: item, quantity: 1 };
    }
    this.itemsSubject.next(items);
  }

  removeItem(item: Dish): void {
    const items = this.itemsSubject.getValue();
    if (items[item.name]?.quantity > 0) {
      items[item.name].quantity--;
      if (items[item.name].quantity === 0) {
        delete items[item.name];
      }
    }
    this.itemsSubject.next(items);
  }

  hasItems(): boolean {
    const items = this.itemsSubject.getValue();
    return Object.keys(items).length > 0;
  }
}