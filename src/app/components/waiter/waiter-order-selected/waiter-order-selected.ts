import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order-service';
import { OrderItemService } from '../../../services/order-item-service';
import { ProductService } from '../../../services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { OrderItem } from '../../../interfaces/data/order-item.interface';
import { WaiterProductItem } from "../waiter-product-item/waiter-product-item";

@Component({
  selector: 'waiter-order-selected',
  imports: [ WaiterProductItem],
  templateUrl: './waiter-order-selected.html',
  styleUrl: './waiter-order-selected.css'
})
export class WaiterOrderSelected {
  orderService = inject(OrderService);
  orderItemService = inject(OrderItemService);
  productService = inject(ProductService);
  orderItemResource = rxResource({
    defaultValue: [],
    params: () => ({ id: this.orderService.orderSelected()?.id }),
    stream: ({ params }) => {
      if (!this.orderService.orderSelected() || params.id == undefined) {
        return of([]);
      }
      return this.orderItemService.getOrderItemsByOrderId(params.id);
    },
  });

  updatedOrderItem(orderItem:OrderItem){
    this.orderItemResource.update((current)=>{return current.map((item)=>item.id===orderItem.id?orderItem:item)});
    this.orderItemService.saveOrderItem(orderItem).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.error(err);
      },
    })
  }
}
