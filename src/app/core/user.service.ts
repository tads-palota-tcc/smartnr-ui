import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://api.smartnr.com.br/users';
  
  constructor(private http: HttpClient) { }

  findTop10ByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?name=${name}`);
  }
  
}
