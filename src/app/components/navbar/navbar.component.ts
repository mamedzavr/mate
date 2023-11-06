import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isCollapsed = true;
  isLoginDialogOpen = false;
  currentLanguage = 'ru';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter(route => route.outlet === 'primary')
      )
      .subscribe(route => {
        this.isLoginDialogOpen = route.snapshot.url.join('/').includes('login');
      });
  }

  openLoginDialog() {
    this.isLoginDialogOpen = true;
  }

  closeLoginDialog() {
    this.isLoginDialogOpen = false;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.currentLanguage = language;
  }
}
