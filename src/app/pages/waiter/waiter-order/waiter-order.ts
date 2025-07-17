import { Component, inject, OnInit } from '@angular/core';
import { BusinessService } from '../../../services/business-service';
import { Auth } from '../../../services/auth';
import { ProductService } from '../../../services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../services/category-service';
import { of } from 'rxjs';

@Component({
  selector: 'app-waiter-order',
  imports: [],
  templateUrl: './waiter-order.html',
  styleUrl: './waiter-order.css',
})
export class WaiterOrder implements OnInit {
  businessService = inject(BusinessService);
  authService = inject(Auth);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  categoryResource = rxResource({
    defaultValue: [],
    stream: () => {
      if (this.categoryService.hasCategories()) {
        console.log('Using cached categories');
        return of(this.categoryService.categories());
      }
      console.log('Fetching categories');
      return this.categoryService.getCategories();
    },
  });

  productResource = rxResource({
    defaultValue: [],
    params: () => ({ id: this.businessService.business()?.id }),
    stream: ({params}) => {
      if (this.productService.hasProducts()) {
        console.log('Using cached products');
        return of(this.productService.products());
      }
      console.log('Fetching products for business ID:', params.id);
      return this.productService.getProductsByBusinessId(params.id!);
    }
  })

  ngOnInit() {}

}
