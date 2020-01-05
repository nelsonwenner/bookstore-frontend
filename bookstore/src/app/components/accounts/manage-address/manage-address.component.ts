import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})

export class ManageAddressComponent implements OnInit {

  addressForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.addressForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      pincode:[],
      locality: [],
      address: []
    })
  }

}

