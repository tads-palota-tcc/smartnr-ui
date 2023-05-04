import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class AreaFilter {
  id?: string;
  code?: string;
  name?: string;
  plantCode?: string;
  status: 'active' | 'inactive' = 'active';
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  areasUrl = 'http://localhost:8080/areas'

  constructor(private http: HttpClient) { }

  search(filter: AreaFilter): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
      .set('status', filter.status);
    
    if (filter.id) {
      params = params.set('id', filter.id);
    }

    if (filter.code) {
      params = params.set('code', filter.code);
    }
    
    if (filter.name) {
      params = params.set('name', filter.name);
    }

    if (filter.plantCode) {
      params = params.set('plantCode', filter.plantCode)
    }

    return this.http.get<any>(this.areasUrl, {params})
  }

  findTopAreas(code: string): Observable<any[]> {
    return this.http.get<Observable<any>[]>(`${this.areasUrl}/top10?code=${code}`)
  }

  inactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.areasUrl}/${id}/inactivate`, {});
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.areasUrl}/${id}/activate`, {});
  }
}
