import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quantity-control',
  templateUrl: './quantity-control.component.html',
  styleUrls: ['./quantity-control.component.css']
})

export class QuantityControlComponent implements OnInit {

  @Input() quantity: number;
  @Output() onChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  private plusOne() {
    if (this.quantity < 30) {
      this.quantity++;
      this.onChange.emit(this.quantity);
    }
  }

  private minusOne() {
    if (this.quantity > 1) {
      this.quantity--;
      this.onChange.emit(this.quantity);
    }
  }

}
