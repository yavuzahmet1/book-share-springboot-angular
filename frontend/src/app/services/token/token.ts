import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const isTokenExpired = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string | null {
    return localStorage.getItem('token') as string | null;
  }

  clear() {
    localStorage.removeItem('token');
  }
}
