import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl!: string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/users`
  }

  findTop10ByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?name=${name}`);
  }
  
}
