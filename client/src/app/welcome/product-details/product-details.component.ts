import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../model/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product?: Product;
  @Output() productEmitter: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  sendBackResult() {
    this.productEmitter?.emit(this.product);
  }

}
