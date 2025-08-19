import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '../../../services/store-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, Subscription, tap } from 'rxjs';
import { WaiterService } from '../../../services/waiter-service';
import { RestaurantSignalRService } from '../../../services/restaurant-signalr-service';
import { OrderService } from '../../../services/order-service';
import { TableService } from '../../../services/table-service';
import { ProductService } from '../../../services/product-service';
import { WaiterOrderList } from '../../../components/waiter/waiter-order-list/waiter-order-list';
import { WaiterOrderSelected } from '../../../components/waiter/waiter-order-selected/waiter-order-selected';

@Component({
  selector: 'app-waiter-main',
  imports: [WaiterOrderList, WaiterOrderSelected],
  templateUrl: './waiter-main.html',
  styleUrl: './waiter-main.css',
})
export class WaiterMain implements OnInit, OnDestroy{
  storeService = inject(StoreService);
  waiterService = inject(WaiterService);
  private subs = new Subscription();
  signalRSerice = inject(RestaurantSignalRService);
  orderService = inject(OrderService);
  tableService = inject(TableService);
  productService = inject(ProductService);
  orderResource = rxResource({
    defaultValue: [],
    params: () => ({ id: this.storeService.waiter()?.id }),
    stream: ({ params }) => {
      if (this.orderService.hasOrders()) {
        return of(this.orderService.orders());
      }
      return this.orderService.getOrdersByStatusAndWaiterId(params.id!, 'all');
    },
  });

  ngOnInit() {
    this.loadWaiter();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadWaiter() {
    if (!this.storeService.waiter()) {
      const id = this.storeService.decoded()?.sub;
      this.waiterService
        .getWaitersByUserId(parseInt(id!))
        .pipe(
          tap((value) => this.storeService.saveWaiterLocalStorage(value)),
          tap((value) => this.storeService.waiter.set(value))
        )
        .subscribe({
          next: (value) => {
            console.log(value);
          },
        });
    }
  }
}
