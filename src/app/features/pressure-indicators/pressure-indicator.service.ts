import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../core/model/equipment';
import { EquipmentFilter } from '../../features/equipments/equipment.service';
import { PressureIndicator } from '../../core/model/pressure-indicator';
import { CalibrationSummary } from '../../core/model/calibration';

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

  baseUrl = 'http://18.232.31.12:8080/pressure-indicators'
  deviceUrl = 'http://18.232.31.12:8080/devices'

  constructor(private http: HttpClient) { }

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

  findAvailable(): Observable<PressureIndicator[]> {
    return this.http.get<PressureIndicator[]>(`${this.baseUrl}/available`);
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
