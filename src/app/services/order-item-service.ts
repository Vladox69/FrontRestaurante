import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { OrderItemListResponse, OrderItemResponse } from '../interfaces/response/order-item-response.interface';
import { map } from 'rxjs';
import { OrderItem } from '../interfaces/data/order-item.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/order-item/`;

  getOrderItemsByOrderId(id:number){
    return this._http.get<OrderItemListResponse>(`${this.url}order/${id}`).pipe(
      map(({data})=>data)
    )
  }

  saveOrderItem(orderItem:OrderItem){
    return this._http.post<OrderItemResponse>(`${this.url}save`,orderItem).pipe(
      map(({data})=>data)
    )
  }

}
