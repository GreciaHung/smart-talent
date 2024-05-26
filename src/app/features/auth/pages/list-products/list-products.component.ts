import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FilterProductPipe } from '../../../../shared/pipes/filter-product-pipe.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductData } from '../../../../shared/declaraciones/interfaces';
import { RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ProductService } from '../../../../shared/services/product/product.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    LoadingComponent,
    HttpClientModule,
    RouterModule,
    MatTooltipModule,
    ProductCardComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FilterProductPipe,
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  searchControl = new FormControl<string>('', Validators.minLength(1));
  products: ProductData[] = [];
  isLoading = false;
  error = '';

  constructor(private readonly productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService
      .getProducts()
      .pipe(
        catchError(() => {
          this.error = 'An error occurred while loading products.';
          return of([]);
        })
      )
      .subscribe((products: ProductData[]) => {
        this.products = products;
        this.isLoading = false;
        this.error = '';
      });
  }
}
