import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Response } from '../models/interfaces/common.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  http = inject(HttpClient)

  get(url: string): Observable<API_Response>{
    return this.http.get<API_Response>(url)
  } 

  post<T>(url: string, body:unknown): Observable<API_Response<T>> {
    return this.http.post<API_Response<T>>(url, body);
  }

  put<T, B = unknown>(url: string, body: B): Observable<API_Response<T>> {
    return this.http.put<API_Response<T>>(url, body);
  }

  delete<T>(url: string): Observable<API_Response<T>> {
    return this.http.delete<API_Response<T>>(url);
  }

}
