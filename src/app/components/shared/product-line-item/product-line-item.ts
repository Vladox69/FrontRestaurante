import { Component, computed, inject, input } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { OrderItem } from '../../../interfaces/data/order-item.interface';
import { OrderService } from '../../../services/order-service';

@Component({
  selector: 'shared-product-line-item',
  imports: [],
  templateUrl: './product-line-item.html',
  styleUrl: './product-line-item.css'
})
export class ProductLineItem {

  productService=inject(ProductService);
  orderItem=input.required<OrderItem>();
  orderService=inject(OrderService);

  orderSummary=computed(()=>{
    const product = this.productService.products().find(p => p.id === this.orderItem().product_id);
    return {
      ...product,
      quantity: this.orderItem().quantity,
      total: product ? product.price! * this.orderItem().quantity! : 0
    };
  })



}
