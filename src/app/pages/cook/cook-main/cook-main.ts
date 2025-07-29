import { Component, inject, OnInit, signal } from '@angular/core';
import { StoreService } from '../../../services/store-service';
import { OrderService } from '../../../services/order-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, tap } from 'rxjs';
import { TableService } from '../../../services/table-service';
import { CookOrderList } from "../../../components/cook/cook-order-list/cook-order-list";
import { CookOrderSelected } from "../../../components/cook/cook-order-selected/cook-order-selected";
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-cook-main',
  imports: [CookOrderList, CookOrderSelected],
  templateUrl: './cook-main.html',
  styleUrl: './cook-main.css',
})
export class CookMain implements OnInit{

  ngOnInit(): void {
    if(!this.tableService.hasTables()){
      this.tableService
      .getTablesByBusinessId(this.storeService.business()?.id!)
      .pipe(tap((value)=>this.tableService.tables.set(value)))
      .subscribe({
        error:(err)=> {
          console.error(err);
        },
      })
    }
    if(!this.productService.hasProducts()){
      this.productService
      .getProductsByBusinessId(this.storeService.business()?.id!)
      .subscribe({
        error:(err)=> {
          console.error(err);
        },
      })
    }
  }

  storeService = inject(StoreService);
  orderService = inject(OrderService);
  tableService = inject(TableService);
  productService = inject(ProductService);
  orderResource = rxResource({
    defaultValue: [],
    params: () => ({ id: this.storeService.business()?.id }),
    stream: ({ params }) => {
      if (this.orderService.hasOrders()) {
        return of(this.orderService.orders());
      }
      return this.orderService.getOrdersByBusinessId(params.id!);
    },
  });
}
