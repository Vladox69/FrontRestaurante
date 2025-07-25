import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginBody } from '../interfaces/body/login.interface';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../interfaces/response/login-response.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private envs = environment;
  private _http = inject(HttpClient);

  login(login: LoginBody) {
    return this._http
      .post<LoginResponse>(`${this.envs.baseURL}/api/user/login`, login)
      .pipe(map(({ data }) => data));
  }
}
