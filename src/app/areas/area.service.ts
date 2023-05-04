import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AreaFilter {
  id: string;
  code: string;
  name: string;
  plantCode: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  areasUrl = 'http://localhost:8080/areas'

  constructor(private http: HttpClient) { }

  search(filter: AreaFilter): Observable<any> {
    let params = new HttpParams();
    params = params.set('id', filter.id)
    params = params.set('code', filter.code)
    params = params.set('name', filter.name)
    params = params.set('plantCode', filter.plantCode)
    params = params.set('status', filter.status)
    return this.http.get<any>(this.areasUrl, {params})
  }

  findTopAreas(code: string): Observable<any[]> {
    return this.http.get<Observable<any>[]>(`${this.areasUrl}/top10?code=${code}`)
  }
}
