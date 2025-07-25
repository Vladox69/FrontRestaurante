import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { CategoryListResponse } from '../interfaces/response/category-response.interface';
import { Category } from '../interfaces/data/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/category/`;
  public categories = signal<Category[]>([]);
  public hasCategories = computed<boolean>(() => this.categories().length > 0);
  getCategories() {
    return this._http.get<CategoryListResponse>(`${this.url}all`).pipe(
      tap(({ data }) => this.categories.set(data)),
      map(({ data }) => data)
    );
  }
}
