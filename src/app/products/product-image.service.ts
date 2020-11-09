import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  get(): Observable<ProductImageResponse> {
    return this.http.get<ProductImageResponse>('api/productimages');
  }
}
