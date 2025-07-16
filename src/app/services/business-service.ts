import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { BusinessResponse } from '../interfaces/response/business-response.interface';
import { Business } from '../interfaces/data/business.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}business/`;
  business = signal<Business | null>(null);

  getBusinessByUserId(id: number) {
    return this._http.get<BusinessResponse>(`${this.url}user/${id}`).pipe(
      tap(({ data }) => this.business.set(data)),
      map(({ data }) => data)
    );
  }
}
