import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProductListResponse } from '../interfaces/response/product-response.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}product/`;

  getProductsByBusinessId(id:number){
    return this._http.get<ProductListResponse>(`${this.url}business/${id}`).pipe(
      map(({data})=>data)
    );
  }

}
