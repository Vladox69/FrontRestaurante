import { OrderItem } from "../data/order-item.interface";
import { ApiResponse } from "./api-response.interface";
export type OrderItemResponse=ApiResponse<OrderItem>;
export type OrderItemListResponse=ApiResponse<OrderItem[]>;
