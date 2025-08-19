import { Component, computed, inject, input } from '@angular/core';
import { Order } from '../../../interfaces/data/order.interface';
import { WaiterOrderItem } from "../waiter-order-item/waiter-order-item";
import { OrderService } from '../../../services/order-service';

@Component({
  selector: 'waiter-order-list',
  imports: [WaiterOrderItem],
  templateUrl: './waiter-order-list.html',
  styleUrl: './waiter-order-list.css'
})
export class WaiterOrderList {
  orders=input.required<Order[]>();
}
