import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay, publishLast, refCount, tap } from 'rxjs/operators';
import { ProductImage } from './product-image';
export interface ProductImageResponse {
  results: ProductImage[];
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  constructor(private http: HttpClient) {}
  get(page: number = 1, filters: any): Observable<ProductImageResponse> {
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
    params = params.append('pageSize', '200');

    return this.http.get<ProductImageResponse>('api/productimages', { params });
  }

  put(productImage: ProductImage): Observable<ProductImage> {
    var data = productImage;

    return this.http.put<ProductImage>(
      `api/productimages/${productImage.id}`,
      data
    );
  }
}
