import { Component, computed, input } from '@angular/core';
import { Order } from '../../../interfaces/data/order.interface';
import { Table } from '../../../interfaces/data/table.interface';
import { CookOrderItem } from "../cook-order-item/cook-order-item";

@Component({
  selector: 'cook-order-list',
  imports: [CookOrderItem],
  templateUrl: './cook-order-list.html',
  styleUrl: './cook-order-list.css'
})
export class CookOrderList {
  orders=input.required<Order[]>()
}
