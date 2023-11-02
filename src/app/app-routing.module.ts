import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'menu', component: MenuListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
