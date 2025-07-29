export interface Order {
  id?:number;
  status?:'pending'|'in-progress' | 'ready' | 'delivered' | 'cancelled';
  total?:number;
  waiter_id?:number;
  table_id?:number;
}
