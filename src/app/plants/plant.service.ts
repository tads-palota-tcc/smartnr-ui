import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../shared/model/page';
import { PlantSummaryResponse } from './plant';

export class PlantFilter {
  id: string;
  code: string;
  name: string;
  status: 'active' | 'inactive';
  page: number;
  size: number;

  constructor() {
    this.id = ''
    this.code = ''
    this.name = ''
    this.status = 'active'
    this.page = 0
    this.size = 5
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plantsUrl = 'http://localhost:8080/plants'

  constructor(private http: HttpClient) { }

  search(filter: PlantFilter): Observable<Page<PlantSummaryResponse>> {
    let params = new HttpParams();
    params = params.set('page', filter.page)
    params = params.set('size', filter.size)
    params = params.set('id', filter.id)
    params = params.set('code', filter.code)
    params = params.set('name', filter.name)
    params = params.set('status', filter.status)
    return this.http.get<any>(this.plantsUrl, {params})
  }

  findTopPlants(code: string): Observable<any[]> {
    return this.http.get<Observable<any>[]>(`${this.plantsUrl}/top10?code=${code}`)
  }
}
