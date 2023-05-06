import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, firstValueFrom } from 'rxjs';
import { ErrorHandlerService } from '../core/error-handler.service';

export class AuthResponse {
  access_token: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
    
  }

  login(id: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, {id, password});
  }

}
