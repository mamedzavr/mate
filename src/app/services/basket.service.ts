import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dish, OrderItem } from 'src/app/models/menu.model';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private itemsSubject = new BehaviorSubject<OrderItem[]>([]);

  get items$() {
    return this.itemsSubject.asObservable();
  }

  get order$() {
    return this.items$.pipe(
      map(items => {
        const total = items.reduce(
          (sum, item) => sum + item.dish.price * item.quantity,
          0
        );
        return { items, total };
      })
    );
  }

  addItem(item: Dish): void {
    const items = this.itemsSubject.getValue();
    const foundItem = items.find(i => i.dish.name === item.name);
    if (foundItem) {
      foundItem.quantity++;
    } else {
      items.push({ dish: item, quantity: 1 });
    }
    this.itemsSubject.next(items);
  }

  removeItem(item: Dish): void {
    const items = this.itemsSubject.getValue();
    const foundItem = items.find(i => i.dish.name === item.name);
    if (foundItem && foundItem.quantity > 0) {
      foundItem.quantity--;
      if (foundItem.quantity === 0) {
        const index = items.indexOf(foundItem);
        items.splice(index, 1);
      }
    }
    this.itemsSubject.next(items);
  }

  hasItems(): boolean {
    const items = this.itemsSubject.getValue();
    return items.length > 0;
  }
}
