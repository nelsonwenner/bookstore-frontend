import { Address } from './../../../core/models/address';
import { AuthService } from './../../../core/services/auth.service';
import { AddressService } from './../../../core/services/address.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})

export class ManageAddressComponent implements OnInit, OnDestroy {

  private subscription = [];

  private addressForm: FormGroup;

  private addresss: Address;

  constructor(private authService: AuthService,
              private address: AddressService,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit() {

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

  addAddress(): void {

    if (this.addressForm.invalid) { return; }

    this.subscription.push(this.address.createAddress(this.addressForm.value)
    .subscribe(address => {

      if (address) {

        const user = this.authService.getCurrentUser();
        const id = address.url.split('/')[4];

        this.subscription.push(this.authService.patchClient({"address": `${id}`}, user.id)
        .subscribe(client => {

          if (client.address) {

            localStorage.setItem('currentUser', JSON.stringify(client));

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
    }));
  }

  updateAddress(): void {

    if (this.addressForm.invalid) { return; }

    const user = this.authService.getCurrentUser();

    Object.keys(this.addressForm.value).map(key => {
      if (this.addressForm.value[key] === '') {
        delete this.addressForm.value[key];
      }
    });

    this.subscription.push(this.address.patchAddress(this.addressForm.value, user.address.url)
    .subscribe(address => {

      if (address) {

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

  existsAddress(): void {
    if (!!this.authService.getCurrentUser()) {
      const client = this.authService.getCurrentUser();

      if (client.address) {
        this.addresss = client.address;
      }
    }
  }
}
