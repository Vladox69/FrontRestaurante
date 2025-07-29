export type OrderStatus='pending'|'in-progress' | 'delivered' | 'cancelled'
export interface Order {
  id?:number;
  status?:OrderStatus;
  total?:number;
  waiter_id?:number;
  table_id?:number;
}
