import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '../interfaces/body/login.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private envs=environment;
  private _http = inject(HttpClient);

  login(login:Login){
    this._http.post<string>(`${this.envs.baseURL}/auth`,login);
  }

}
