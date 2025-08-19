import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Sidebar } from '../../components/shared/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { StoreService } from '../../services/store-service';
import { RestaurantSignalRService } from '../../services/restaurant-signalr-service';
import { of, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit,OnDestroy {
  private subs = new Subscription();
  storeService = inject(StoreService);
  productService = inject(ProductService);
  signalRSerice = inject(RestaurantSignalRService);
  orderService = inject(OrderService);
  toastr = inject(ToastrService);
  role = this.storeService.decoded()?.role;
  productResource = rxResource({
    defaultValue: [],
    params: () => ({ id: this.storeService.business()?.id }),
    stream: ({ params }) => {
      if (this.productService.hasProducts()) {
        return of(this.productService.products());
      }
      return this.productService.getProductsByBusinessId(params.id!);
    },
  });
  ngOnInit(): void {
    if (this.role === 'waiter') {
      this.subs.add(
        this.signalRSerice.waiterNotifications$.subscribe((data) => {
          this.orderService.orderSignalR$.next(data);
          const productFind = this.productResource.value().find((p)=>p.id==data.orderItem.product_id)
          this.toastr.success(`${productFind?.name} listo`, `Orden #${data.orderItem.order_id}`);
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
