import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  usePlaceholders = false;
  constructor(private http: HttpClient) {}

  getTestConfig() {
    return this.http
      .get('get-cypress-config')
      .pipe(tap((x) => (this.usePlaceholders = true)));
  }

  handleError() {}
}
