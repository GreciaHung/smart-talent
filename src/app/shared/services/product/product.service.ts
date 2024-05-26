import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductData } from '../../declaraciones/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly BASE_URL = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts() {
    return this.http.get<ProductData[]>(this.BASE_URL);
  }

  getProductById(id: string) {
    return this.http.get<ProductData>(`${this.BASE_URL}/${id}`);
  }

  addProduct(product: ProductData) {
    console.log(product);
    
    return this.http.post<void>(this.BASE_URL, product);
  }
}
