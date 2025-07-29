export type OrderItemStatus = 'pending' | 'in-progress' | 'ready' | 'delivered';
export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  quantity_auxiliar?: number;
  status?: OrderItemStatus;
}
