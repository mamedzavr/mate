import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    // Check if the previous URL was the MenuListComponent
    return snapshot.url === '/menu';
  }
}
