import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { TableListResponse } from '../interfaces/response/table-response.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Table } from '../interfaces/data/table.interface';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private envs = environment;
  private _http = inject(HttpClient);
  private url = `${this.envs.baseURL}/api/table/`;
  public tables = signal<Table[]>([]);
  public hasTables = computed<boolean>(()=>this.tables().length>0);

  getTablesByBusinessId(id: number) {
    return this._http
      .get<TableListResponse>(`${this.url}business/${id}`)
      .pipe(map(({ data }) => data));
  }
}
