import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-credit-card',
  templateUrl: './manage-credit-card.component.html',
  styleUrls: ['./manage-credit-card.component.css']
})

export class ManageCreditCardComponent implements OnInit {

  cardForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.cardForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      pincode: [],
      locality: [],
      address: []
    })
  }

}
