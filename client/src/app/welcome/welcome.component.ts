import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  products?: Product[];
  chosenProduct?: Product;

  // Angular Services
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openDetails(products: Product) {
    this.chosenProduct = products;
  }

  receiveProduct(event: any) {
    console.log(event);
  }

  delete(product: Product) {
    this.productService.deleteProduct(product).subscribe(
    () => {
      console.log('Product deleted successfully');
      this.router.navigate([this.router.url]);
    }
  );
  }



}
