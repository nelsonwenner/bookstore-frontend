import { AuthService } from './../../../core/services/auth.service';
import { CreditCardService } from '../../../core/services/credit-card.service';
import { CreditCard } from './../../../core/models/creditcard';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-credit-card',
  templateUrl: './manage-credit-card.component.html',
  styleUrls: ['./manage-credit-card.component.css']
})

export class ManageCreditCardComponent implements OnInit, OnDestroy  {

  private subscription = [];

  private cardForm: FormGroup;

  private creditcard: CreditCard;

  constructor(private creditCartService: CreditCardService,
              private authService: AuthService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.existsCreditCart();

    this.cardForm = this.fb.group({
      owner: [''],
      flag: [''],
      number: [''],
      number_security: [''],
    });
  }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  addCreditCart(): void {

    if (this.cardForm.invalid) { return; }

    this.subscription.push(this.creditCartService.createCreditCart(this.cardForm.value)
    .subscribe(creditcart => {

      if (creditcart) {

        const user = this.authService.getCurrentUser();
        const id = creditcart.url.split('/')[4];

        this.subscription.push(this.authService.patchClient({"credit_card": `${id}`}, user.id)
        .subscribe(client => {

          if (client.credit_card) {

            localStorage.setItem('currentUser', JSON.stringify(client));

            this.toastr.success('Save success ', null, {
              progressAnimation: 'decreasing',
              positionClass: 'toast-bottom-right',
              progressBar: true,
              closeButton: true,
              timeOut: 3000,
            });
          }
        }));
      }
    }));
  }

  updateCreditCart(): void {

    if (this.cardForm.invalid) { return; }

    const user = this.authService.getCurrentUser();

    Object.keys(this.cardForm.value).map(key => {
      if (this.cardForm.value[key] === '') {
        delete this.cardForm.value[key];
      }
    });

    this.subscription.push(this.creditCartService.patchCreditCard(this.cardForm.value, user.credit_card.url)
    .subscribe(creditcart => {

      if (creditcart) {

        this.subscription.push(this.authService.getDataClient(user.id).subscribe(client => {
          localStorage.setItem('currentUser', JSON.stringify(client));
        }));

        this.toastr.success('Save success', null, {
          progressAnimation: 'decreasing',
          positionClass: 'toast-bottom-right',
          progressBar: true,
          closeButton: true,
          timeOut: 3000,
        });
      }

    }));

  }

  existsCreditCart(): void {
    if (!!this.authService.getCurrentUser()) {
      const client = this.authService.getCurrentUser();

      this.creditcard = client.credit_card;

    }
  }

}
