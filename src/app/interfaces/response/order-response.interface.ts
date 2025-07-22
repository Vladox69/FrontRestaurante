import { Order } from "../data/order.interface";
import { ApiResponse } from "./api-response.interface";
export type OrderResponse=ApiResponse<Order>;
export type OrderListResponse=ApiResponse<Order[]>;
