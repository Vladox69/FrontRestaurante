import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { WaiterResponse } from '../interfaces/response/waiter-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WaiterService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/waiter/`;

  getWaitersByUserId(id: number) {
    return this._http
      .get<WaiterResponse>(`${this.url}${id}`)
      .pipe(map(({ data }) => data));
  }
}
