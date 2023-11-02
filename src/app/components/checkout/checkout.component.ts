import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, scan, take } from 'rxjs/operators';
import { Dish } from 'src/app/models/menu.model';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  total$ = new BehaviorSubject<number>(0);
  serviceFee$ = new BehaviorSubject<number>(0);
  finalTotal$ = new BehaviorSubject<number>(0);
  serviceFee = 0.1;

  constructor(public basketService: BasketService) {}

  increaseOrder(item: Dish) {
    this.basketService.addItem(item);
    this.updateTotals();
  }

  decreaseOrder(item: Dish) {
    this.basketService.removeItem(item);
    this.updateTotals();
  }

  ngOnInit() {
    this.updateTotals();
  }

  updateTotals() {
    const total = this.calculateTotal();
    const serviceFee = this.calculateServiceFee();
    const finalTotal = this.calculateFinalTotal();

    this.animateValue(this.total$.value, total, 1000).subscribe(value =>
      this.total$.next(value),
    );
    this.animateValue(this.serviceFee$.value, serviceFee, 1000).subscribe(
      value => this.serviceFee$.next(value),
    );
    this.animateValue(this.finalTotal$.value, finalTotal, 1000).subscribe(
      value => this.finalTotal$.next(value),
    );
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

  animateValue(
    start: number,
    end: number,
    duration: number,
  ): Observable<number> {
    const steps = duration / 100;
    const stepValue = (end - start) / steps;
    const counter = interval(100).pipe(
      take(steps),
      map(x => start + x * stepValue),
    );

    return counter;
  }
}
