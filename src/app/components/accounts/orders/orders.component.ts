import { AuthService } from './../../../core/services/auth.service';
import { Client } from './../../../core/models/client';
import { OrderService } from './../../../core/services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit, OnDestroy {

  private currentUser: Client = this.authService.getCurrentUser();

  private subscription = [];

  private ordersList = [];

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.getOrders();

  }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  getOrders(): void  {

    this.subscription.push(this.orderService.getOrders()
    .subscribe(response => {

      if (response.results.length) {

        response.results.forEach(order => {

          if (order.client === this.currentUser.url) {
            this.ordersList.push(order);
          }
        });
      }
    }));
  }

  deleteOrder(id, index): void {

    this.subscription.push(this.orderService.deleteOrder(id)
    .subscribe(response => {

      /* remove order on orferList */
      this.ordersList.splice(index, 1);

      this.toastr.success('Order deleted with success', null, {
        progressAnimation: 'decreasing',
        positionClass: 'toast-bottom-right',
        progressBar: true,
        closeButton: true,
        timeOut: 3000,
      });

    }));
  }

}
