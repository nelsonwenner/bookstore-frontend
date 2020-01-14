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

    this.observerCreditCard();
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
        this.subscription.push(this.authService.patchClient({"credit_card": `${creditcart.url}`}, user.id)
        .subscribe(client => {

          if (client.credit_card) {

            localStorage.setItem('currentUser', JSON.stringify(client));
            this.creditCartService.getObserverOnCreditCard().next(true);
            this.authService.getObserverIsLoggedIn().next(true);

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

    this.subscription.push(this.creditCartService.patchCreditCard(this.cardForm.value, user.credit_card)
    .subscribe(creditcart => {

      if (creditcart) {
        this.creditCartService.getObserverOnCreditCard().next(true);

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
      this.subscription.push(this.creditCartService.getCreditCard(client.credit_card)
      .subscribe(creditcard => {
        this.creditcard = creditcard;
      }));
    }
  }

  observerCreditCard(): void {
    const client = this.authService.getCurrentUser();
    this.subscription.push(this.creditCartService.getObserverOnCreditCard()
    .subscribe(newCreditCard => {

      if (newCreditCard) {
        this.subscription.push(this.creditCartService.getCreditCard(client.credit_card)
        .subscribe(creditcard => {
          this.creditcard = creditcard;
        }));
      }
    }));
  }

}
