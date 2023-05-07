import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>( environment.baseServerUrl + '/products' );
  }

  deleteProduct(u: any ): Observable<void> {
    const body = {
      name: u.name,
      price: u.price,
      description: u.description
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: body
    };

    const url = environment.baseServerUrl + '/products' ;
    return this.http.delete<void>(url, options);
  }
}
