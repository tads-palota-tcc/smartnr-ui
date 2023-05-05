import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(id: string, password: string): Observable<void> {
    return this.http.post<void>(this.authUrl, {id, password});
  }
}
