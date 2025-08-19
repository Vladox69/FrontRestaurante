import { NgClass } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { ProductService } from '../../../services/product-service';
import { OrderItem, OrderItemStatus } from '../../../interfaces/data/order-item.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'waiter-product-item',
  imports: [NgClass],
  templateUrl: './waiter-product-item.html',
  styleUrl: './waiter-product-item.css'
})
export class WaiterProductItem {
  productService = inject(ProductService);
  orderItem = input.required<OrderItem>();
  updatedOrderItem = output<OrderItem>();

  orderSummary = computed(() => {
    const product = this.productService
      .products()
      .find((p) => p.id == this.orderItem().product_id);
    return {
      ...this.orderItem(),
      name: product?.name,
      description: product?.description,
    };
  });

  changeOrderStatus() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        let newStatus:OrderItemStatus =  'in-progress';
        if(this.orderItem().quantity==this.orderItem().quantity_auxiliar){
          newStatus = 'delivered';
        }else{
          newStatus = 'in-progress';
        }
        const newOrderItem:OrderItem={
          ...this.orderItem(),
          status:newStatus
        }
        this.updatedOrderItem.emit(newOrderItem);
      }
    });
  }
}
