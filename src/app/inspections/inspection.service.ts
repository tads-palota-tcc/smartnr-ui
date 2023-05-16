import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calibration, CalibrationSummary } from '../core/model/calibration';

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

  baseUrl = 'http://localhost:8080/inspections';

  constructor(private http: HttpClient) { }

  create(Calibration: Calibration): Observable<Calibration> {
    return this.http.post<Calibration>(`${this.baseUrl}`, Calibration);
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

    console.log(params)
    return this.http.get<any>(this.baseUrl, {params})
  }

  findById(id: number): Observable<Calibration> {
    return this.http.get<Calibration>(`${this.baseUrl}/${id}`);
  }
  
  update(id: number, Calibration: Calibration): Observable<Calibration> {
    return this.http.put<Calibration>(`${this.baseUrl}/${id}`, Calibration);
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

}
