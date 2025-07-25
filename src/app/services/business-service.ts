import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { BusinessResponse } from '../interfaces/response/business-response.interface';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/business/`;

  getBusinessByUserId(id: number) {
    return this._http.get<BusinessResponse>(`${this.url}user/${id}`).pipe(
      map(({ data }) => data)
    );
  }


}
