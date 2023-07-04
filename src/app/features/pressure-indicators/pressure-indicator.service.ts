import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PressureIndicator } from '../../core/model/pressure-indicator';
import { CalibrationSummary } from '../../core/model/calibration';
import { environment } from 'src/environments/environment';

export class PressureIndicatorFilter {
  id?: string;
  tag?: string;
  minGauge?: number;
  maxGauge?: number;
  plantCode?: string;
  status: 'active' | 'inactive' = 'active';
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PressureIndicatorService {

  baseUrl!: string;
  deviceUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/pressure-indicators`;
    this.deviceUrl = `${environment.apiUrl}/devices`;
  }

  create(object: PressureIndicator): Observable<PressureIndicator> {
    return this.http.post<PressureIndicator>(`${this.baseUrl}`, object);
  }

  search(filter: PressureIndicatorFilter): Observable<any> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
      .set('status', filter.status);
    
    if (filter.id) {
      params = params.set('id', filter.id);
    }

    if (filter.tag) {
      params = params.set('tag', filter.tag);
    }
    
    if (filter.minGauge) {
      params = params.set('minGauge', filter.minGauge);
    }

    if (filter.maxGauge) {
      params = params.set('maxGauge', filter.maxGauge);
    }

    if (filter.plantCode) {
      params = params.set('plantCode', filter.plantCode)
    }
    
    return this.http.get<any>(this.baseUrl, {params})
  }

  findById(id: number): Observable<PressureIndicator> {
    return this.http.get<PressureIndicator>(`${this.baseUrl}/${id}`);
  }

  findCalibrations(deviceId: number): Observable<CalibrationSummary[]> {
    return this.http.get<CalibrationSummary[]>(`${this.deviceUrl}/${deviceId}/calibrations`);
  }

  findAvailable(plantId: number): Observable<PressureIndicator[]> {
    return this.http.get<PressureIndicator[]>(`${this.baseUrl}/available?plantId=${plantId}`);
  }

  update(id: number, object: PressureIndicator): Observable<PressureIndicator> {
    return this.http.put<PressureIndicator>(`${this.baseUrl}/${id}`, object);
  }

  inactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/inactivate`, {});
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activate`, {});
  }
  
}
