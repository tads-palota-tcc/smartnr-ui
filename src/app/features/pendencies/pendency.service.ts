import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../../core/model/area';
import { PendencyCreationRequest, PendencyResponse } from '../../core/model/pendency';

export class PendencyFilter {
  id?: number;
  authorName?: string;
  responsibleName?: string;
  openedAt?: Date;
  deadLine?: Date;
  plantCode?: string;
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PendencyService {

  baseUrl = 'http://18.232.31.12:8080/pendencies';

  constructor(private http: HttpClient) { }

  create(obj: PendencyCreationRequest): Observable<PendencyResponse> {
    return this.http.post<PendencyResponse>(`${this.baseUrl}`, obj);
  }

  search(filter: PendencyFilter): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
    
    if (filter.id) {
      params = params.set('id', filter.id);
    }

    if (filter.authorName) {
      params = params.set('authorName', filter.authorName);
    }
    
    if (filter.responsibleName) {
      params = params.set('responsibleName', filter.responsibleName);
    }

    if (filter.openedAt) {
      params = params.set('openedAt', filter.openedAt.toString());
    }

    if (filter.deadLine) {
      params = params.set('deadLine', filter.deadLine.toString());
    }

    if (filter.plantCode) {
      params = params.set('plantCode', filter.plantCode)
    }

    return this.http.get<any>(this.baseUrl, {params});
  }

  findById(id: number): Observable<PendencyResponse> {
    return this.http.get<PendencyResponse>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  update(id: number, obj: PendencyCreationRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, obj);
  }

}
