export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id?: number;
  quantity?: number;
  status?: 'in-progress' | 'ready' | 'delivered' | 'cancelled';
}
