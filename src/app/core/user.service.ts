import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080/users';
  
  constructor(private http: HttpClient) { }

  findTop10ByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?name=${name}`);
  }
  
}
