import { Component, inject, input } from '@angular/core';
import { Product } from '../../../interfaces/data/product.interface';
import { OrderService } from '../../../services/order-service';

@Component({
  selector: 'shared-product-item',
  imports: [],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {
  product=input.required<Product>();
  orderService=inject(OrderService);
  addToOrder(){
    this.orderService.addToOrder(this.product());
  }
}
