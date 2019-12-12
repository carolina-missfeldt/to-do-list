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

  getList(end_point): Observable<GenericClass[]> {
    return this.http.get<Array<any>>(`${environment.url}/${end_point}`)
  }
}
