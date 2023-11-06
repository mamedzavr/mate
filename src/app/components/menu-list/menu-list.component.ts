import {Component} from '@angular/core';
import {Dish, getMenuItems} from '../../models/menu.model';
import {BasketService} from 'src/app/services/basket.service';
import {animate, state, style, transition, trigger,} from '@angular/animations';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
  animations: [
    trigger('slideUpDown', [
      state(
        'void',
        style({
          height: '0',
          opacity: '0',
          overflow: 'hidden',
        }),
      ),
      state(
        '*',
        style({
          height: '*',
          opacity: '1',
          overflow: 'auto',
        }),
      ),
      transition('void <=> *', animate('600ms ease-in-out')),
    ]),
  ],
})
export class MenuListComponent {
  openCategories = new Set<string>();

  menuItems = getMenuItems();
  categories: string[] = [
    ...new Set(this.menuItems.map(item => item.category)),
  ];

  constructor(public basketService: BasketService) {
  }

  getItemsByCategory(category: string): Dish[] {
    return this.menuItems.filter(item => item.category === category);
  }

  toggleCategory(category: string) {
    if (this.openCategories.has(category)) {
      this.openCategories.delete(category);
    } else {
      this.openCategories.add(category);
    }
  }

  isCategoryOpen(category: string): boolean {
    return this.openCategories.has(category);
  }
}
