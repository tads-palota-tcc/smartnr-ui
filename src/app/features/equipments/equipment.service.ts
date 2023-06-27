import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment, EquipmentSituation } from '../../core/model/equipment';
import { Observable } from 'rxjs';
import { ApplicableTest, Test } from '../../core/model/applicable-tests';
import { Page } from '../../shared/model/page';

export class EquipmentFilter {
  id?: string;
  tag?: string;
  name?: string;
  areaCode?: string;
  status: 'active' | 'inactive' = 'active';
  page: number = 0;
  size: number = 5;
}

export class SituationFilter {
  tag?: string;
  plant?: string;
  page: number = 0;
  size: number = 10;
}

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  baseUrl = 'http://18.232.31.12:8080/equipments'

  constructor(private http: HttpClient) { }

  create(object: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.baseUrl}`, object);
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
    
    return this.http.get<any>(this.baseUrl, {params})
  }

  findById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`);
  }

  update(id: number, object: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(`${this.baseUrl}/${id}`, object);
  }

  bindPressureSafetyValve(equipmentId: number, psvId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${equipmentId}/pressure-safety-valves/${psvId}`, {});
  }

  unbindPressureSafetyValve(equipmentId: number, psvId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${equipmentId}/pressure-safety-valves/${psvId}`, {});
  }

  bindPressureIndicator(equipmentId: number, piId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${equipmentId}/pressure-indicators/${piId}`, {});
  }

  unbindPressureIndicator(equipmentId: number, piId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${equipmentId}/pressure-indicators/${piId}`, {});
  }

  inactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/inactivate`, {});
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/activate`, {});
  }

  findTests(): Observable<Test[]> {
    return this.http.get<Test[]>('http://18.232.31.12:8080/tests');
  }

  addApplicableTest(id: number, applicableTest: ApplicableTest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/applicable-tests`, applicableTest);
  }

  inactivateApplicableTest(id: number, testId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/applicable-tests/${testId}`);
  }

  activateApplicableTest(id: number, testId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/applicable-tests/${testId}`, {});
  }

  findByPlantCodeAndTag(plantCode: string, tag: string): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}?plantCode=${plantCode}&tag=${tag}`);
  }

  uploadHeaders() {
    return new HttpHeaders()
      .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
      .append('Accept', 'application/json')
  }

  downloadDatabook(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');
    return this.http.get(`${this.baseUrl}/${id}/data-book`, {headers: headers, responseType: 'blob'});
  }

  downloadSafetyJournal(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');
    return this.http.get(`${this.baseUrl}/${id}/safety-journal`, {headers: headers, responseType: 'blob'});
  }

  downloadInstallationProject(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Accept', 'application/pdf');
    return this.http.get(`${this.baseUrl}/${id}/installation-project`, {headers: headers, responseType: 'blob'});
  }

  deleteDatabook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/data-book`);
  }

  deleteSafetyJournal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/safety-journal`);
  }

  deleteInstallationProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}/installation-project`);
  }

  findEquipmentsSituation(filter: SituationFilter): Observable<Page<EquipmentSituation>> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('size', filter.size)
      .set('status', 'active');

    if (filter.tag) {
      params = params.set('tag', filter.tag);
    }

    if (filter.plant) {
      params = params.set('plant', filter.plant)
    }
    
    return this.http.get<Page<EquipmentSituation>>(`${this.baseUrl}/situation`, {params});
  }
  
}
