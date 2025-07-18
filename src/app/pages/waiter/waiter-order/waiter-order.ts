import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BusinessService } from '../../../services/business-service';
import { ProductService } from '../../../services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../services/category-service';
import { of } from 'rxjs';
import { ProductList } from "../../../components/shared/product-list/product-list";
import { OrderService } from '../../../services/order-service';
import { ProductLineItem } from "../../../components/shared/product-line-item/product-line-item";

@Component({
  selector: 'app-waiter-order',
  imports: [ProductList, ProductLineItem],
  templateUrl: './waiter-order.html',
  styleUrl: './waiter-order.css',
})
export class WaiterOrder implements OnInit {
  businessService = inject(BusinessService);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  orderService = inject(OrderService);
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
    stream: ({ params }) => {
      if (this.productService.hasProducts()) {
        return of(this.productService.products());
      }
      return this.productService.getProductsByBusinessId(params.id!);
    },
  });
  selectedCategoryId = signal<number | null>(null);
  filteredProducts = computed(() => {
    const allProducts = this.productResource.value();
    const selectedId = this.selectedCategoryId();
    return selectedId
      ? allProducts.filter((p) => p.category_id === selectedId)
      : allProducts;
  });
  ngOnInit() {}
}
