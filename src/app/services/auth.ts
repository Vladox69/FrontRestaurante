import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginBody } from '../interfaces/body/login.interface';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../interfaces/response/login-response.interface';
import { jwtDecode } from 'jwt-decode';
import { DECODED_TOKEN_KEY, TOKEN_KEY } from '../config/config';
import { DecodedToken } from '../interfaces/data/decoded-token.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private envs = environment;
  private _http = inject(HttpClient);

  login(login: LoginBody) {
    return this._http
      .post<LoginResponse>(`${this.envs.baseURL}user/login`, login)
      .pipe(map(({ data }) => data));
  }

  decodeToken(token: string) {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      return null;
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  saveDecodedToken(decodedToken: DecodedToken): void {
    localStorage.setItem(DECODED_TOKEN_KEY, JSON.stringify(decodedToken));
  }

  getToken(): string {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token == null) return '';
    return token;
  }

  getDecodedToken(): DecodedToken | null {
    const rawToken = localStorage.getItem(DECODED_TOKEN_KEY);
    if (!rawToken) {
      return null;
    }
    try {
      return JSON.parse(rawToken) as DecodedToken;
    } catch (error) {
      return null;
    }
  }

  validateToken(token: string) {
    const decodedToken = this.decodeToken(token);
    if (decodedToken == null) {
      // *TODO: agregar un swal
      return;
    }
    this.saveDecodedToken(decodedToken);
    this.saveToken(token);
  }
}
