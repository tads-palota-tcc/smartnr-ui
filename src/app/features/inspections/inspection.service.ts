import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calibration, CalibrationSummary } from '../../core/model/calibration';
import { Inspection } from '../../core/model/Inspection';
import { Test } from '../../core/model/applicable-tests';
import { PendencyResponse } from '../../core/model/pendency';

export class InspectionFilter {
  executionDate?: Date;
  reportNumber?: string;
  executorCompany?: string;
  status: 'WAITING_REPORT' | 'DONE' | '' = '';
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class InspectionService {

  baseUrl = 'http://18.232.31.12:8080/inspections';

  constructor(private http: HttpClient) { }

  create(inspection: Inspection): Observable<Inspection> {
    return this.http.post<Inspection>(`${this.baseUrl}`, inspection);
  }

  search(filter: InspectionFilter): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
    
    if (filter.executionDate) {
      params = params.set('executionDate', filter.executionDate.toString());
    }

    if (filter.reportNumber) {
      params = params.set('reportNumber', filter.reportNumber);
    }
    
    if (filter.executorCompany) {
      params = params.set('executorCompany', filter.executorCompany);
    }

    if (filter.status) {
      params = params.set('status', filter.status);
    }

    return this.http.get<any>(this.baseUrl, {params})
  }

  findById(id: number): Observable<Inspection> {
    return this.http.get<Inspection>(`${this.baseUrl}/${id}`);
  }
  
  update(id: number, inspection: Inspection): Observable<Inspection> {
    return this.http.put<Inspection>(`${this.baseUrl}/${id}`, inspection);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  downloadReport(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');
    return this.http.get(`${this.baseUrl}/${id}/reports`, {headers: headers, responseType: 'blob'});
  }

  deleteReport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/reports`);
  }

  uploadHeaders() {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Accept', 'application/json')
      
  }

  findTests(): Observable<Test[]> {
    return this.http.get<Test[]>('http://18.232.31.12:8080/tests');
  }

  findPendenciesByInspection(inspectionId: number): Observable<PendencyResponse[]> {
    return this.http.get<PendencyResponse[]>(`${this.baseUrl}/${inspectionId}/pendencies`);
  }

}
