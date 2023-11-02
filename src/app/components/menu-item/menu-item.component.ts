import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/menu.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit {
  @Input()
  item!: Dish;
  itemCount: number = 0;

  constructor(public basketService: BasketService) {}

  ngOnInit(): void {
    this.updateItemCount();
  }

  updateItemCount(): void {
    const basketItem = this.basketService.getItems()[this.item.name];
    this.itemCount = basketItem ? basketItem.quantity : 0;
  }

  increaseOrder(): void {
    this.basketService.addItem(this.item);
    this.updateItemCount();
  }

  decreaseOrder(): void {
    this.basketService.removeItem(this.item);
    this.updateItemCount();
  }
}