import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { StoreService } from '../../../services/store-service';
import { OrderService } from '../../../services/order-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, Subscription, tap } from 'rxjs';
import { TableService } from '../../../services/table-service';
import { CookOrderList } from '../../../components/cook/cook-order-list/cook-order-list';
import { CookOrderSelected } from '../../../components/cook/cook-order-selected/cook-order-selected';
import { ProductService } from '../../../services/product-service';
import { RestaurantSignalRService } from '../../../services/restaurant-signalr-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cook-main',
  imports: [CookOrderList, CookOrderSelected],
  templateUrl: './cook-main.html',
  styleUrl: './cook-main.css',
})
export class CookMain implements OnInit, OnDestroy {
  private subs = new Subscription();
  signalRSerice = inject(RestaurantSignalRService);
  toastr = inject(ToastrService);
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
  ngOnInit(): void {
    if (!this.tableService.hasTables()) {
      this.tableService
        .getTablesByBusinessId(this.storeService.business()?.id!)
        .pipe(tap((value) => this.tableService.tables.set(value)))
        .subscribe({
          error: (err) => {
            console.error(err);
          },
        });
    }
    if (!this.productService.hasProducts()) {
      this.productService
        .getProductsByBusinessId(this.storeService.business()?.id!)
        .subscribe({
          error: (err) => {
            console.error(err);
          },
        });
    }
    this.subs.add(
      this.signalRSerice.cookNotifications$.subscribe((data) => {
        const table = this.tableService.tables().find((t)=>t.id==data.order.table_id);
        this.toastr.success(`Mesa #${table?.table_number} - ${table?.location}`, `Nueva Orden #${data.order.id}`);
        this.orderResource.update((current) => [data.order, ...current]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
