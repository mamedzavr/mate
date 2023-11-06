import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/menu.model';
import { BasketService } from 'src/app/services/basket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input()
  item!: Dish;
  itemCount: number = 0;
  private subscription!: Subscription;

  constructor(public basketService: BasketService) {}

  ngOnInit(): void {
    this.subscription = this.basketService.items$.subscribe(items => {
      const basketItem = items.find(i => i.dish.name === this.item.name);
      this.itemCount = basketItem ? basketItem.quantity : 0;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  increaseOrder(): void {
    this.basketService.addItem(this.item);
  }

  decreaseOrder(): void {
    this.basketService.removeItem(this.item);
  }
}
