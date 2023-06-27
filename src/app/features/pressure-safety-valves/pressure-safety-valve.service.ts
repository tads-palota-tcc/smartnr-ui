import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CalibrationSummary } from '../../core/model/calibration';
import { PressureSafetyValve } from '../../core/model/pressure-safety-valve';

export class PressureSafetyValveFilter {
  id?: string;
  tag?: string;
  openingPressure?: number;
  closingPressure?: number;
  plantCode?: string;
  status: 'active' | 'inactive' = 'active';
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PressureSafetyValveService {

  baseUrl = 'http://18.232.31.12:8080/pressure-safety-valves'
  deviceUrl = 'http://18.232.31.12:8080/devices'

  constructor(private http: HttpClient) { }

  create(object: PressureSafetyValve): Observable<PressureSafetyValve> {
    return this.http.post<PressureSafetyValve>(`${this.baseUrl}`, object);
  }

  search(filter: PressureSafetyValveFilter): Observable<any> {
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
    
    if (filter.openingPressure) {
      params = params.set('openingPressure', filter.openingPressure);
    }

    if (filter.closingPressure) {
      params = params.set('closingPressure', filter.closingPressure);
    }

    if (filter.plantCode) {
      params = params.set('plantCode', filter.plantCode)
    }
    
    return this.http.get<any>(this.baseUrl, {params})
  }

  findById(id: number): Observable<PressureSafetyValve> {
    return this.http.get<PressureSafetyValve>(`${this.baseUrl}/${id}`);
  }

  findCalibrations(deviceId: number): Observable<CalibrationSummary[]> {
    return this.http.get<CalibrationSummary[]>(`${this.deviceUrl}/${deviceId}/calibrations`);
  }

  findAvailable(): Observable<PressureSafetyValve[]> {
    return this.http.get<PressureSafetyValve[]>(`${this.baseUrl}/available`);
  }

  update(id: number, object: PressureSafetyValve): Observable<PressureSafetyValve> {
    return this.http.put<PressureSafetyValve>(`${this.baseUrl}/${id}`, object);
  }

  inactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/inactivate`, {});
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activate`, {});
  }
  
}
