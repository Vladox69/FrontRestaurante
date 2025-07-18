import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BusinessService } from '../../../services/business-service';
import { ProductService } from '../../../services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryService } from '../../../services/category-service';
import { of } from 'rxjs';
import { ProductList } from '../../../components/shared/product-list/product-list';
import { OrderService } from '../../../services/order-service';
import { ProductLineItem } from '../../../components/shared/product-line-item/product-line-item';
import { NgClass } from '@angular/common';

@Component({
  selector: 'restaurant-waiter-new-orders',
  imports: [ProductList, ProductLineItem, NgClass],
  templateUrl: './waiter-new-order.html',
  styleUrl: './waiter-new-order.css',
})
export class WaiterNewOrder {
  businessService = inject(BusinessService);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  orderService = inject(OrderService);
  selectedCategoryId = signal<number | null>(null);
  filteredProducts = computed(() => {
    const allProducts = this.productResource.value();
    const selectedId = this.selectedCategoryId();
    return selectedId
      ? allProducts.filter((p) => p.category_id === selectedId)
      : allProducts;
  });
  total = computed(() => {
    return this.orderService
      .order()
      .reduce((acc, item) => {
        const product = this.productService
          .products()
          .find((p) => p.id === item.product_id);
        return acc + (product ? product.price! * item.quantity! : 0);
      }, 0)
      .toFixed(2);
  });
  categoryResource = rxResource({
    defaultValue: [],
    stream: () => {
      if (this.categoryService.hasCategories()) {
        return of(this.categoryService.categories());
      }
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

  finishOrder(){
    console.log("Finalizando orden");
  }

}
