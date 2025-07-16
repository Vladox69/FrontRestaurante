import { Product } from '../data/product.interface';
import { ApiResponse } from './api-response.interface';
export type ProductResponse=ApiResponse<Product>;
export type ProductListResponse=ApiResponse<Product[]>;
