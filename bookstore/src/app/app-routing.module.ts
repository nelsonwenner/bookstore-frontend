import { CartComponent } from './components/carts/cart/cart.component';
import { BooksComponent } from './components/books/book/books.component';
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/guard/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { Page404 } from './components/page404/page404.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'home', component: HomeComponent },

  { path: 'books', component: BooksComponent },

  { path: 'books/:id', component: BookDetailComponent },

  { path: 'carts', component: CartComponent },

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
