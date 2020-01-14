import { OrdersComponent } from './components/accounts/orders/orders.component';
import { ManageCreditCardComponent } from './components/accounts/manage-credit-card/manage-credit-card.component';
import { ManageAddressComponent } from './components/accounts/manage-address/manage-address.component';
import { ProfileInformationComponent } from './components/accounts/profile-information/profile-information.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { CheckoutComponent } from './components/checkouts/checkout/checkout.component';
import { CartComponent } from './components/carts/cart/cart.component';
import { BooksComponent } from './components/books/book/books.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { Page404 } from './components/page404/page404.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },

  { path: 'books', component: BooksComponent },

  { path: 'books/:id', component: BookDetailComponent },

  { path: 'carts', component: CartComponent },

  { path: 'accounts',
  component: AccountComponent,
  canActivate: [AuthGuardService],
  children: [

    {
      path: 'orders',
      component: OrdersComponent
    },

    {
      path: 'profile',
      component: ProfileInformationComponent
    },

    {
      path: 'address',
      component: ManageAddressComponent
    },

    {
      path: 'creditcard',
      component: ManageCreditCardComponent
    }

  ]},

  { path: 'carts/checkouts',
  component: CheckoutComponent,
  canActivate: [AuthGuardService],
  children: [

  ]},

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home', pathMatch: 'full' },

  { path: '404', component: Page404 },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
