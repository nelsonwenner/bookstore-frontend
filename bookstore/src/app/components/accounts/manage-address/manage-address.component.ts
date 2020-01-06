import { Address } from './../../../core/models/address';
import { AuthService } from './../../../core/services/auth.service';
import { AddressService } from './../../../core/services/address.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})

export class ManageAddressComponent implements OnInit, OnDestroy {

  private subscription = [];

  private addressForm: FormGroup;
  private submitted = false;

  private addresss: Address;

  constructor(private authService: AuthService,
              private address: AddressService,
              private fb: FormBuilder) { }

  ngOnInit() {

    this.observerAddress();
    this.existsAddress();

    this.addressForm = this.fb.group({
      street: [''],
      suite: [''],
      city: [''],
      zipcode: ['']
    });
  }

  ngOnDestroy() {

    this.subscription.forEach(sub => sub.unsubscribe());

  }

  addAddress() {

    this.submitted = true;

    if (this.addressForm.invalid) { return; }

    this.subscription.push(this.address.createAddress(this.addressForm.value)
    .subscribe(address => {

      if (address) {

        const user = this.authService.getCurrentUser();
        this.subscription.push(this.authService.patchClient({"address": `${address.url}`}, user.id)
        .subscribe(client => {

          if (client.address) {

            localStorage.setItem('currentUser', JSON.stringify(client));
            this.address.getObserverOnAddress().next(true);
            this.authService.getObserverIsLoggedIn().next(true);
          }

        }));
      }
    }));
  }

  existsAddress() {
    if (!!this.authService.getCurrentUser()) {
      const client = this.authService.getCurrentUser();
      this.subscription.push(this.address.getAddress(client.address).subscribe(address => {
        this.addresss = address;
      }));
    }
  }

  observerAddress() {
    const client = this.authService.getCurrentUser();
    this.subscription.push(this.address.getObserverOnAddress().subscribe(newAddress => {

      if (newAddress) {
        this.subscription.push(this.address.getAddress(client.address).subscribe(address => {
          this.addresss = address;
        }));
      }
    }));
  }

}

