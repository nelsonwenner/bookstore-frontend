import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard.service';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },

  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
