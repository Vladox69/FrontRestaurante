import { Component, computed, inject, input } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { OrderItem } from '../../../interfaces/data/order-item.interface';

@Component({
  selector: 'shared-product-line-item',
  imports: [],
  templateUrl: './product-line-item.html',
  styleUrl: './product-line-item.css'
})
export class ProductLineItem {

  productService=inject(ProductService);
  orderItem=input.required<OrderItem>();

  orderSummary=computed(()=>{
    const product = this.productService.products().find(p => p.id === this.orderItem().product_id);
    return {
      ...product,
      quantity: this.orderItem().quantity
    };
  })

}
