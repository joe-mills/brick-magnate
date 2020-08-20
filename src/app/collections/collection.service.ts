import { Injectable } from '@angular/core';
import { Collection } from './collection';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionItem } from './collection-item';
export interface CollectionResponse {
  results: Collection[];
  total: number;
}
@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient) {}

  get(): Observable<CollectionResponse> {
    return this.http.get<CollectionResponse>('api/collections').pipe();
  }
  post(collection: Collection): Observable<Collection> {
    var data = collection;

    return this.http.post<Collection>('api/collections', data);
  }
  put(collection: Collection): Observable<Collection> {
    var data = collection;

    return this.http.put<Collection>(`api/collections/${collection.id}`, data);
  }
  delete(id: number): Observable<Collection> {
    return this.http.delete<Collection>(`api/collections/${id}`);
  }
  addProductToCollection(
    productId: number,
    collectionId: number
  ): Observable<CollectionItem> {
    var data = {
      productId,
      collectionId,
    };

    return this.http.post<CollectionItem>('/collections/addProduct', data);
  }
}
