import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchItem } from './search-box/search-box.component';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  get(term: string): Observable<SearchItem[]> {
    let params = new HttpParams();

    params = params.append('term', term);

    return this.http.get<SearchItem[]>(`api/search`, { params });
  }
}
