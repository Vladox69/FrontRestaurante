import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { BusinessResponse } from '../interfaces/response/business-response.interface';
import { Business } from '../interfaces/data/business.interface';
import { BUSINESS_KEY } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}business/`;
  public business = signal<Business | null>(this.getBusinessFromLocalStorage());

  getBusinessByUserId(id: number) {
    return this._http.get<BusinessResponse>(`${this.url}user/${id}`).pipe(
      tap(({ data }) => this.business.set(data)),
      map(({ data }) => data)
    );
  }

  saveBusinessLocalStorage(business: Business) {
    localStorage.setItem(BUSINESS_KEY, JSON.stringify(business));
  }

  getBusinessFromLocalStorage(): Business | null {
    const rawBusiness = localStorage.getItem(BUSINESS_KEY);
    if (!rawBusiness) {
      return null;
    }
    try {
      return JSON.parse(rawBusiness) as Business;
    } catch (error) {
      return null;
    }
  }

}
