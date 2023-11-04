import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Dish} from 'src/app/models/menu.model';
import {BasketService} from 'src/app/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
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
            const serviceFee = value * this.serviceFeeRate;
            this.serviceFee$.next(serviceFee);
            this.finalTotal$.next(value + serviceFee);
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
