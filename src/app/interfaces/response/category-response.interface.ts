import { Category } from '../data/category.interface';
import { ApiResponse } from './api-response.interface';
export type CategoryResponse = ApiResponse<Category>;
export type CategoryListResponse = ApiResponse<Category[]>;
