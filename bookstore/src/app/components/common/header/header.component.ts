import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { User } from './../../../models/user';

/* Add imports */
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../../login/login.component';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  loadingEnable: boolean;
  private currentUser: User;

  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

  constructor(public loadingService: LoadingService,
              private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {

    this.authService.isloggedIn.subscribe(next => {
      this.currentUser = this.authService.getCurrentUser();
    });

    this.loadingService.progressEnable.subscribe(next => {
      this.loadingEnable = next;
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout(): void {
    this.currentUser = null;
    this.authService.logout();
  }
}
