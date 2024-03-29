import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostForecast, PendencyByPlant, PendencyByResponsible } from './model/statistics';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  baseUrl!: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/statistics`;
  }

  
  findPlantsPendencies(): Observable<PendencyByPlant[]> {
    return this.http.get<PendencyByPlant[]>(`${this.baseUrl}/plants-pendencies`);
  }

  findResponsiblePendencies(): Observable<PendencyByResponsible[]> {
    return this.http.get<PendencyByResponsible[]>(`${this.baseUrl}/responsibles-pendencies`);
  }
  
  findCostForecast(plantId: number | ''): Observable<CostForecast[]> {
    return this.http.get<CostForecast[]>(`${this.baseUrl}/costs-forecast?plantId=${plantId}`);
  }

}
