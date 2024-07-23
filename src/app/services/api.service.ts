import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { RequestI } from '../models/req-res-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  BaseURL: string = 'https://api.openweathermap.org/data/2.5/';
  APIKEY: string = '4c91a71af87a374a61d2cd2d8763cdc7';

  constructor(private http: HttpClient) {}

  get<T>(req: RequestI) {
    return this.http.get<T>(this.BaseURL + req.path, {
      params: req.queryParam,
    });
  }

  post(req: RequestI) {
    return this.http.post(this.BaseURL + req.path, req.data);
  }
}
