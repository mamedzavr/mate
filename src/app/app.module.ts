import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component';
import {MenuListComponent} from './components/menu-list/menu-list.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {LoginDialogComponent} from './components/login-dialog/login-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    ContactComponent,
    FooterComponent,
    MenuListComponent,
    MenuItemComponent,
    AboutUsComponent,
    CheckoutComponent,
    LoginDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
