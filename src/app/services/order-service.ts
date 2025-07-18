import { computed, Injectable, signal } from '@angular/core';
import { OrderItem } from '../interfaces/data/order-item.interface';
import { Product } from '../interfaces/data/product.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order = signal<OrderItem[]>([]);
  hasItems = computed(() => this.order().length > 0);
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
}
