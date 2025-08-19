import { Component, computed, inject, input } from '@angular/core';
import { Order } from '../../../interfaces/data/order.interface';
import { TableService } from '../../../services/table-service';
import { Table } from '../../../interfaces/data/table.interface';
import { OrderService } from '../../../services/order-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'waiter-order-item',
  imports: [NgClass],
  templateUrl: './waiter-order-item.html',
  styleUrl: './waiter-order-item.css',
})
export class WaiterOrderItem {
  order = input.required<Order>();
  tableService = inject(TableService);
  table = computed<Table>(() => this.tableService.tables().find((t) => t.id == this.order().table_id)!);
  orderService = inject(OrderService);
  isSelected = computed<boolean>(() => {
    if (!this.orderService.orderSelected()) {
      return false;
    }
    return this.order().id==this.orderService.orderSelected()?.id;
  });
}
