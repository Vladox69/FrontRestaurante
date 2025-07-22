import { Injectable, signal } from '@angular/core';
import { DecodedToken } from '../interfaces/data/decoded-token.interface';
import { jwtDecode } from 'jwt-decode';
import { BUSINESS_KEY, DECODED_TOKEN_KEY, TOKEN_KEY, WAITERS_KEY } from '../config/config';
import { Business } from '../interfaces/data/business.interface';
import { Waiter } from '../interfaces/data/waiter.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  public business = signal<Business | null>(this.getBusinessFromLocalStorage());
  public waiter = signal<Waiter | null>(this.getWaiterFromLocalStorage());
  public decoded = signal<DecodedToken | null>(this.getDecodedToken());

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

  saveBusinessLocalStorage(business: Business) {
    localStorage.setItem(BUSINESS_KEY, JSON.stringify(business));
  }

  getWaiterFromLocalStorage(): Waiter | null {
    const rawWaiter = localStorage.getItem(WAITERS_KEY);
    if (!rawWaiter) {
      return null;
    }
    try {
      return JSON.parse(rawWaiter) as Waiter;
    } catch (error) {
      return null;
    }
  }

  saveWaiterLocalStorage(waiter: Waiter) {
    localStorage.setItem(WAITERS_KEY, JSON.stringify(waiter));
  }

}
