import {animate, style, transition, trigger} from '@angular/animations';
import {ViewportScroller} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Dish, OrderItem} from 'src/app/models/menu.model';
import {BasketService} from 'src/app/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [
    trigger('fade', [
      transition(':leave', [
        style({opacity: 1}),
        animate('0.5s ease-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class CheckoutComponent implements OnInit {
  total$ = new BehaviorSubject<number>(0);
  serviceFee$ = new BehaviorSubject<number>(0);
  finalTotal$ = new BehaviorSubject<number>(0);
  private subscription!: Subscription;
  private serviceFeeRate = 0.1;

  constructor(
    public basketService: BasketService,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {
  }

  ngOnInit() {
    this.subscription = this.basketService.order$.subscribe(order => {
      if (order.total === 0) {
        this.router.navigate(['/menu']);
      } else {
        this.animateValue(this.total$.value, order.total, 1000).subscribe(
          value => {
            this.total$.next(value);
            const serviceFee =
              Math.round(value * this.serviceFeeRate * 100) / 100;
            this.serviceFee$.next(serviceFee);
            const finalTotal = Math.round((value + serviceFee) * 100) / 100;
            this.finalTotal$.next(finalTotal);
          },
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  increaseOrder(item: Dish) {
    this.basketService.addItem(item);
  }

  decreaseOrder(item: Dish) {
    this.basketService.removeItem(item);
  }

  toggleControls(item: OrderItem) {
    const viewportWidth = this.viewportScroller.getScrollPosition()[0];
    if (viewportWidth < 768) {
      // Adjust this value based on your needs
      item.showControls = !item.showControls;
    }
  }

  animateValue(
    start: number,
    end: number,
    duration: number,
  ): Observable<number> {
    return timer(0, duration / 100).pipe(
      map(
        elapsed =>
          start + (end - start) * Math.min(elapsed / (duration / 100), 1),
      ),
      take(101),
    );
  }
}
