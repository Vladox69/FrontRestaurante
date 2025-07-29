import { Component, computed, inject } from '@angular/core';
import { OrderService } from '../../../services/order-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { OrderItemService } from '../../../services/order-item-service';
import { ProductService } from '../../../services/product-service';
import { CookProductItem } from "../cook-product-item/cook-product-item";
import { OrderItem } from '../../../interfaces/data/order-item.interface';

@Component({
  selector: 'cook-order-selected',
  imports: [CookProductItem],
  templateUrl: './cook-order-selected.html',
  styleUrl: './cook-order-selected.css',
})
export class CookOrderSelected {
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
