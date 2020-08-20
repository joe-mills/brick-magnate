import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpiderService {
  constructor(private http: HttpClient) {}

  goSpider(themeCode: string, spider: string): Observable<boolean> {
    const body = {
      themeCode,
      spider,
    };
    return this.http.post<boolean>('api/spiders/gospider', body);
  }
}
