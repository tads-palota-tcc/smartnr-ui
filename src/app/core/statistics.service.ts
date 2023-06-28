import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostForecast, PendencyByPlant, PendencyByResponsible } from './model/statistics';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  baseUrl = 'https://api.smartnr.com.br/statistics';

  constructor(private http: HttpClient) { }

  
  findPlantsPendencies(): Observable<PendencyByPlant[]> {
    return this.http.get<PendencyByPlant[]>(`${this.baseUrl}/plants-pendencies`);
  }

  findResponsiblePendencies(): Observable<PendencyByResponsible[]> {
    return this.http.get<PendencyByResponsible[]>(`${this.baseUrl}/responsibles-pendencies`);
  }
  
  findCostForecast(plantId: number): Observable<CostForecast[]> {
    return this.http.get<CostForecast[]>(`${this.baseUrl}/costs-forecast?plantId=${plantId}`);
  }

}
