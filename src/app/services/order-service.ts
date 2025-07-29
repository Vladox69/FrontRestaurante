import { computed, inject, Injectable, signal } from '@angular/core';
import { OrderItem } from '../interfaces/data/order-item.interface';
import { Product } from '../interfaces/data/product.interface';
import { Order } from '../interfaces/data/order.interface';
import { Table } from '../interfaces/data/table.interface';
import { OrderBody } from '../interfaces/body/order-body.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { OrderListResponse, OrderResponse } from '../interfaces/response/order-response.interface';
import { map } from 'rxjs';
import { StoreService } from './store-service';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/order/`;
  private store = inject(StoreService);
  private productService = inject(ProductService);
  orders = signal<Order[]>([]);
  order = signal<OrderItem[]>([]);
  table = signal<Table | null>(null);
  orderSelected = signal<Order|null>(null);
  hasItems = computed(() => this.order().length > 0);
  hasOrders = computed(() => this.orders().length > 0);
  total = computed(() => {
    return this
      .order()
      .reduce((acc, item) => {
        const product = this.productService
          .products()
          .find((p) => p.id === item.product_id);
        return acc + (product ? product.price! * item.quantity! : 0);
      }, 0)
      .toFixed(2);
  });
  addToOrder(product: Product) {
    const index = this.order().findIndex((i) => i.product_id === product.id);

    if (index > -1) {
      // Copiamos el item y actualizamos la cantidad
      const updatedItem = {
        ...this.order()[index],
        quantity: this.order()[index].quantity! + 1,
      };

      this.order.update((currentOrder) => {
        const newOrder = [...currentOrder];
        newOrder[index] = updatedItem;
        return newOrder;
      });
    } else {
      this.order.update((currentOrder) => [
        ...currentOrder,
        { product_id: product.id, quantity: 1 ,status: 'in-progress'} as OrderItem,
      ]);
    }
  }

  updateOrderItemQuantity(id: number, change: number) {
    const index = this.order().findIndex((i) => i.product_id === id);
    if (index > -1) {
      const currentItem = this.order()[index];
      const newQuantity = currentItem.quantity! + change;
      if (newQuantity <= 0) {
        this.deleteProductFromOrder(id);
      } else {
        this.order.update((currentOrder) =>
          currentOrder.map((i) =>
            i.product_id === id ? { ...i, quantity: newQuantity } : i
          )
        );
      }
    }
  }

  deleteProductFromOrder(id: number) {
    this.order.update((currentOrder) =>
      currentOrder.filter((item) => item.product_id !== id)
    );
  }

  createOrder() {
    const newOrder: Order = {
      status: 'in-progress',
      total: parseFloat(this.total()),
      waiter_id: this.store.waiter()?.id,
      table_id: 1,
    };
    const body: OrderBody = {
      order: newOrder,
      items: this.order(),
    };
    return this._http
      .post<OrderResponse>(`${this.url}create-order`, body)
      .pipe(map(({ data }) => data));
  }

  getOrdersByBusinessId(id:number){
    return this._http.get<OrderListResponse>(`${this.url}business/${id}`).pipe(
      map(({ data }) => data)
    )
  }

}
