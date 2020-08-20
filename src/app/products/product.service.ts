import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, map, tap, publishLast, refCount } from 'rxjs/operators';

export interface ProductResponse {
  results: Product[];
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private static readonly PAGE_SIZE = 50;

  private subject = new BehaviorSubject<Product[]>([]);

  products$: Observable<Product[]> = this.subject.asObservable();

  private totalSubject = new BehaviorSubject<number>(0);
  total$: Observable<number> = this.totalSubject.asObservable();
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  currentPage = 1;
  constructor(private http: HttpClient) {}

  get(
    page: number = 1,
    filters: any
  ): Observable<ProductResponse> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach((filter) => {
        const value = filters[filter];
        if (value) {
          params = params.append(filter, filters[filter]);
        }
      });
    }

    params = params.append('page', page.toString());
    params = params.append('pageSize', ProductService.PAGE_SIZE.toString());

    this.loadingSubject.next(true);

    return this.http
      .get<ProductResponse>('api/products', { params })
      .pipe(
        tap((res) => {
          this.subject.next(res.results);
          this.totalSubject.next(res.total);
          this.loadingSubject.next(false);
        }),
        publishLast(),
        refCount()
      );
  }

  getByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`api/products/${code}`);
  }
}
