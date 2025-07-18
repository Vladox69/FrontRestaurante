import { Injectable, signal } from '@angular/core';
import { OrderItem } from '../interfaces/data/order-item.interface';
import { Product } from '../interfaces/data/product.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order = signal<OrderItem[]>([]);

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
        { product_id: product.id, quantity: 1 } as OrderItem,
      ]);
    }
  }
}
