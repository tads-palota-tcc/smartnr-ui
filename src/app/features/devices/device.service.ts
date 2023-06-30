import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Device } from '../../core/model/device';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl!: string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/devices`;
  }

  findByPlantCodeAndTag(plantCode: string, tag: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}?plantCode=${plantCode}&tag=${tag}`);
  }
  
}
