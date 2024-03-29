import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../../core/model/plant';
import { environment } from 'src/environments/environment';

export class PlantFilter {
  id?: string;
  code?: string;
  name?: string;
  status: 'active' | 'inactive' = 'active';
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plantsUrl!: string;

  constructor(private http: HttpClient) {
    this.plantsUrl = `${environment.apiUrl}/plants`;
  }

  create(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(`${this.plantsUrl}`, plant);
  }

  search(filter: PlantFilter): Observable<any> {
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

    return this.http.get<any>(this.plantsUrl, {params})
  }

  findAll(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.plantsUrl}/all`);
  }

  findById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.plantsUrl}/${id}`);
  }

  findTopPlants(code: string): Observable<any[]> {
    return this.http.get<Observable<any>[]>(`${this.plantsUrl}/top10?code=${code}`)
  }

  update(id: number, plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.plantsUrl}/${id}`, plant);
  }

  inactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.plantsUrl}/${id}/inactivate`, {});
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.plantsUrl}/${id}/activate`, {});
  }

}
