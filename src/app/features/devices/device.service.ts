import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Device } from '../../core/model/device';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseUrl = 'http://18.232.31.12:8080/devices';
  
  constructor(private http: HttpClient) { }

  findByPlantCodeAndTag(plantCode: string, tag: string): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.baseUrl}?plantCode=${plantCode}&tag=${tag}`);
  }
  
}
