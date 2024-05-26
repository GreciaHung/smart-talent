import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ProductData } from '../../../../shared/declaraciones/interfaces';
import { FilterProductPipe } from '../../../../shared/pipes/filter-product-pipe.pipe';
import { EditProductCardComponent } from '../../../../shared/components/edit-product-card/edit-product-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditProductModalComponent } from '../../components/edit-product-modal/edit-product-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../../../shared/services/product/product.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-list-admin-products',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    EditProductCardComponent,
    ReactiveFormsModule,
    CommonModule,
    FilterProductPipe,
  ],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
})
export class ListProductsAdminComponent implements OnInit {
  searchControl = new FormControl<string>('', Validators.minLength(1));
  products: ProductData[] = [];
  isLoading = false;

  constructor(
    private readonly productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.productService
      .getProducts()
      .pipe(
        catchError(() => {
          return of([]);
        })
      )
      .subscribe((products: ProductData[]) => {
        this.products = products;
        this.isLoading = false;
        console.log(products);
      });
  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: ProductData) => {
      if (result) {
        this.productService.addProduct(result).subscribe((res) => {
          this.getProducts();
        });
      }
    });
  }
}
