import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { User } from './../../../models/user';
import { Subscription } from 'rxjs';

/* Add imports */
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from '../../../services/auth.service';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  subscriptionIsLogged: Subscription;
  subscriptiondialogRef: Subscription;
  currentUser: User;

  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  constructor(private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.subscriptionIsLogged = this.authService.getObserverIsLogged().subscribe(isLogged => {
      if (isLogged) {
        this.currentUser = this.authService.getCurrentUser();
      }
    });
  }

  ngOnDestroy() {

    if (this.subscriptionIsLogged) {
      this.subscriptionIsLogged.unsubscribe();
    }

    if (this.subscriptiondialogRef) {
      this.subscriptiondialogRef.unsubscribe();
    }

  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });

    this.subscriptiondialogRef = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    this.currentUser = null;
    this.authService.logout();
  }
}
