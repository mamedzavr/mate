import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/models/menu.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    public basketService: BasketService,
    private router: Router,
  ) {}

  serviceFee = 0.1;

  increaseOrder(item: Dish) {
    this.basketService.addItem(item);
  }

  decreaseOrder(item: Dish) {
    this.basketService.removeItem(item);
  }

  onCheckout() {
    const items = this.basketService.getItems();
    for (let key in items) {
      while (items[key].quantity > 0) {
        this.basketService.removeItem(items[key].dish);
      }
    }
    this.router.navigate(['/confirmation']);
  }

  calculateTotal(): number {
    let total = 0;
    for (let key in this.basketService.getItems()) {
      total +=
        this.basketService.getItems()[key].dish.price *
        this.basketService.getItems()[key].quantity;
    }
    return parseFloat(total.toFixed(1));
  }

  calculateServiceFee(): number {
    return parseFloat((this.calculateTotal() * this.serviceFee).toFixed(1));
  }

  calculateFinalTotal(): number {
    return parseFloat(
      (this.calculateTotal() + this.calculateServiceFee()).toFixed(1),
    );
  }
}
