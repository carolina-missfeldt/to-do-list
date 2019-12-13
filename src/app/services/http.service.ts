import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenericClass } from '../class/generic-class';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  options = { observe: 'response' as 'body' };

  constructor(private http: HttpClient) { }

  getList(end_point: string): Observable<GenericClass[]> {
    return this.http.get<Array<GenericClass>>(`${environment.url}/${end_point}`);
  }

  getItem(end_point: string): Observable<GenericClass> {
    return this.http.get<GenericClass>(`${environment.url}/${end_point}`);
  }

  put(end_point: string, params: GenericClass) {
    return this.http.put<HttpResponse<Object>>(`${environment.url}/${end_point}`, params);
  }

  post(end_point: string, params: GenericClass) {
    return this.http.post<HttpResponse<Object>>(`${environment.url}/${end_point}`, params);
  }

  delete(end_point: string): Observable<any> {
    return this.http.delete<HttpResponse<Object>>(`${environment.url}/${end_point}`);
  }
}
