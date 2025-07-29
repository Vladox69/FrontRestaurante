import { Component, computed, inject, input } from '@angular/core';
import { Order } from '../../../interfaces/data/order.interface';
import { Table } from '../../../interfaces/data/table.interface';
import { TableService } from '../../../services/table-service';
import { NgClass } from '@angular/common';
import { OrderService } from '../../../services/order-service';

@Component({
  selector: 'cook-order-item',
  imports: [NgClass],
  templateUrl: './cook-order-item.html',
  styleUrl: './cook-order-item.css'
})
export class CookOrderItem {
  order = input.required<Order>();
  tableService = inject(TableService);
  table = computed<Table>(()=> this.tableService.tables().find((t)=>t.id==this.order().table_id)!);
  orderService = inject(OrderService);

}
