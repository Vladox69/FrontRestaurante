import { Component, input } from '@angular/core';
import { Order } from '../../../interfaces/data/order.interface';
import { WaiterOrderItem } from "../waiter-order-item/waiter-order-item";

@Component({
  selector: 'waiter-order-list',
  imports: [WaiterOrderItem],
  templateUrl: './waiter-order-list.html',
  styleUrl: './waiter-order-list.css'
})
export class WaiterOrderList {
orders=input.required<Order[]>()
}
