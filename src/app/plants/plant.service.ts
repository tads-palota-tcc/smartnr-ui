import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PlantFilter {
  id: string;
  code: string;
  name: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plantsUrl = 'http://localhost:8080/plants'

  constructor(private http: HttpClient) { }

  search(filter: PlantFilter): Observable<any> {

    let params = new HttpParams();

    if (filter.code) {
      console.log(filter.code)
      params = params.set('id', filter.id)
      params = params.set('code', filter.code)
      params = params.set('name', filter.name)
      params = params.set('status', filter.status)
    }

    return this.http.get<any>(this.plantsUrl, {params})
  }

  findTopPlants(code: string): Observable<any[]> {
    return this.http.get<Observable<any>[]>(`${this.plantsUrl}/top10?code=${code}`)
  }
}
