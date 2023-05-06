import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Router } from '@angular/router';

export class AuthResponse {
  access_token: string = '';
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

  login(id: string, password: string) {
    return this.http.post<AuthResponse>(this.authUrl, {id, password}).subscribe({
      next: (res) => {
        this.storeToken(res.access_token);
        this.router.navigate(['/plants']);
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

  private loadToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.storeToken(token);
    }
  }

}
