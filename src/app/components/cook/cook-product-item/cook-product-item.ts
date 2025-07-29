import { Component, computed, inject, input, output } from '@angular/core';
import { OrderItem } from '../../../interfaces/data/order-item.interface';
import { ProductService } from '../../../services/product-service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'cook-product-item',
  imports: [FormsModule],
  templateUrl: './cook-product-item.html',
  styleUrl: './cook-product-item.css',
})
export class CookProductItem {
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
        const newAuxiliarQuantity = this.orderItem().quantity_auxiliar!+1;
        let newStatus:'pending'|'in-progress' | 'ready' | 'delivered' =  'pending';
        if(this.orderItem().quantity==this.orderItem().quantity_auxiliar){
          newStatus = 'ready';
        }else{
          newStatus = 'in-progress';
        }
        const newOrderItem:OrderItem={
          ...this.orderItem(),
          quantity_auxiliar:newAuxiliarQuantity,
          status:newStatus
        }
        this.updatedOrderItem.emit(newOrderItem);
      }
    });
  }
}
