import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Observable } from 'rxjs';

export class AuthResponse {
  access_token: string = '';
  refresh_token: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://18.232.31.12:8080/auth';
  jwtPayload!: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private errorHandler: ErrorHandlerService) {
    this.loadToken();
  }

  login(email: string, password: string): Observable<AuthResponse> {
    console.log('Service.login');
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, {email, password});
  }

  getNewAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.http.post<AuthResponse>(`${this.authUrl}/refresh-token`, {refresh_token: refreshToken})
  }

  storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  storeRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

  clearAccessToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.jwtPayload = null;
  }

  isAccessTokenInvalid() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  isRefreshTokenInvalid() {
    const refreshToken = localStorage.getItem('refreshToken');

    return !refreshToken || this.jwtHelper.isTokenExpired(refreshToken);
  }

  hasPermission(persmission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(persmission);
  }

  hasAnyRole(roles: string[]): boolean {
    for (const role of roles) {
      if (this.hasPermission(role)) {
        return true;
      }
    }
    return false;
  }

}
