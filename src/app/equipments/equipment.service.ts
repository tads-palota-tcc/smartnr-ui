import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from '../core/model/equipment';
import { Observable } from 'rxjs';

export class EquipmentFilter {
  id?: string;
  tag?: string;
  name?: string;
  areaCode?: string;
  category?: string;
  status: 'active' | 'inactive' = 'active';
  page: number = 0;
  size: number = 5;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  equipmentsUrl = 'http://localhost:8080/equipments'

  constructor(private http: HttpClient) { }

  create(equipment: Equipment): Observable<Equipment> {
    console.log(equipment);
    return this.http.post<Equipment>(`${this.equipmentsUrl}`, equipment);
  }

  search(filter: EquipmentFilter): Observable<any> {
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
    
    if (filter.name) {
      params = params.set('name', filter.name);
    }

    if (filter.areaCode) {
      params = params.set('areaCode', filter.areaCode)
    }

    if (filter.category) {
      params = params.set('category', filter.category)
    }

    return this.http.get<any>(this.equipmentsUrl, {params})
  }

  findById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.equipmentsUrl}/${id}`);
  }

  update(id: number, equipment: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.equipmentsUrl}/${id}`, equipment);
  }

  inactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.equipmentsUrl}/${id}/inactivate`, {});
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.equipmentsUrl}/${id}/activate`, {});
  }
}
