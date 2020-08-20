import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Theme } from './theme';
import { delay, publishLast, refCount, tap } from 'rxjs/operators';
export interface ThemeResponse {
  results: Theme[];
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private http: HttpClient) {}

  get(): Observable<ThemeResponse> {
    return this.http.get<ThemeResponse>('api/themes').pipe();
  }
  getByCode(code: number): Observable<Theme> {
    return this.http.get<Theme>(`api/themes/${code}`).pipe(delay(2000));
  }
}
