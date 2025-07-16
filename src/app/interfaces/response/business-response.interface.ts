import { Business } from '../data/business.interface';
import { ApiResponse } from './api-response.interface';
export type BusinessResponse=ApiResponse<Business>;
export type BusinessListResponse=ApiResponse<Business[]>;
