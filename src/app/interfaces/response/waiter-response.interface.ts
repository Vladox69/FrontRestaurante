import { Waiter } from "../data/waiter.interface";
import { ApiResponse } from "./api-response.interface";
export type WaiterResponse = ApiResponse<Waiter>;
export type WaiterListResponse = ApiResponse<Waiter[]>;
