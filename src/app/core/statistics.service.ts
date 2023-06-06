import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../core/model/equipment';
import { EquipmentFilter } from '../features/equipments/equipment.service';
import { PressureIndicator } from '../core/model/pressure-indicator';
import { CalibrationSummary } from '../core/model/calibration';
import { PendencyByPlant, PendencyByResponsible } from './model/statistics';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  baseUrl = 'http://localhost:8080/statistics';

  constructor(private http: HttpClient) { }

  
  findPlantsPendencies(): Observable<PendencyByPlant[]> {
    return this.http.get<PendencyByPlant[]>(`${this.baseUrl}/plants-pendencies`);
  }

  findResponsiblePendencies(): Observable<PendencyByResponsible[]> {
    return this.http.get<PendencyByResponsible[]>(`${this.baseUrl}/responsibles-pendencies`);
  }
  
}
