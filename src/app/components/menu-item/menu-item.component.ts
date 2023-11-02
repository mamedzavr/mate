import { Component, Input } from '@angular/core';
import { Dish } from 'src/app/models/menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {
  @Input()
  item!: Dish;
}
