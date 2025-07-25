import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProductListResponse } from '../interfaces/response/product-response.interface';
import { map } from 'rxjs';
import { Product } from '../interfaces/data/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/product/`;
  public products = signal<Product[]>([]);
  public hasProducts = computed<boolean>(() => this.products().length > 0);

  getProductsByBusinessId(id: number) {
    return this._http
      .get<ProductListResponse>(`${this.url}business/${id}`)
      .pipe(
        map(({ data }) => data),
        map((value) => {
          value.forEach((product) => {
            const exists = this.products().some((sp) => sp.id === product.id);
            if (!exists) {
              this.products.update((products) => [...products, product]);
            }
          });
          return this.products();
        })
      );
  }
}
