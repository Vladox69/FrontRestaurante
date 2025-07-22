import { OrderItem } from "../data/order-item.interface";
import { Order } from "../data/order.interface";

export interface OrderBody{
  order:Order;
  items: OrderItem[];
}
