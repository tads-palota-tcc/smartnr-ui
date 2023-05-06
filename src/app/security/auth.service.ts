import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Router } from '@angular/router';

export class AuthResponse {
  access_token: string = '';
  refresh_token: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/auth';
  jwtPayload!: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router, private errorHandler: ErrorHandlerService) {
    this.loadToken();
  }

  login(email: string, password: string) {
    this.http.post<AuthResponse>(`${this.authUrl}/login`, {email, password}).subscribe({
      next: (res) => {
        this.storeToken(res.access_token);
        this.storeRefreshToken(res.refresh_token);
        this.router.navigate(['/plants']);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  getNewAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.http.post<AuthResponse>(`${this.authUrl}/refresh-token`, {refresh_token: refreshToken}, ).subscribe({
      next: (res) => {
        this.storeToken(res.access_token);
        this.storeRefreshToken(res.refresh_token);
      },
      error: (err) => {
        this.errorHandler.handle(err);
      }
    });
  }

  private storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private storeRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

  hasPermission(persmission: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(persmission);
  }

}
