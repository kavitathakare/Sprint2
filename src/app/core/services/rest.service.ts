import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Base } from '@core/models/base.model';
import { Page } from '@core/models/page.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class RestService<T extends Base> {
  url: string = environment.baseUrl;

  constructor(public http: HttpClient) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/course`);
  }

  getPage(params?: any, baseUrl?: string): Observable<Page<T>> {
    return this.http.get<Page<T>>(baseUrl? baseUrl: this.url, { params });
  }

  getById(id: number[]): Observable<T[]> {
    return this.http.get<T[]>(`${this.url}/${id}`);
  }

  create(obj: T, type?: string): Observable<T> {
    const newObj:any = obj;
    if(type == 'student' || type == 'teacher' && !this.url.includes('useradd')) {
      if(!newObj['password']) {
        newObj['password'] = "Test@123";
      }
      this.url = environment.baseUrl+'/useradd';
    }
    return this.http.post<T>(this.url, newObj);
  }

  update(id: number, obj: T, type?: string): Observable<T> {
    if(type == 'student' || type == 'teacher' && !this.url.includes('updateuser')) {
      this.url = environment.baseUrl+'/updateuser';
    } else {
      this.url = environment.baseUrl+'/course';
    }
    return this.http.put<T>(`${this.url}/${id}`, obj);
  }

  delete(ids: number[], type?: string): Observable<T> {
    if(type == 'student' || type == 'teacher' && !this.url.includes('deleteusers')) {
      this.url = environment.baseUrl + '/deleteusers';
    }
    return this.http.delete<T>(`${this.url}/${ids}`);
  }

  deleteMultiple(ids: number[], type?: string): Observable<T> {
    if(type == 'student' || type == 'teacher' && !this.url.includes('deleteusers')) {
      this.url = environment.baseUrl + '/deleteusers';
    }
    if(type == 'course' && !this.url.includes('delete/course')) {
      this.url = environment.baseUrl + '/delete/course';
    }
    return this.http.post<T>(this.url, ids);
  }
}
