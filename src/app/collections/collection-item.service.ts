import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionItem } from './collection-item';

@Injectable({
  providedIn: 'root',
})
export class CollectionItemService {
  constructor(private http: HttpClient) {}

  get(): Observable<CollectionItem[]> {
    return this.http.get<CollectionItem[]>('api/collectionitems').pipe();
  }
  post(collectionItem: CollectionItem): Observable<CollectionItem> {
    var data = collectionItem;
    return this.http.post<CollectionItem>('api/collectionitems', data);
  }
  put(collectionItem: CollectionItem): Observable<CollectionItem> {
    var data = collectionItem;
    
    return this.http.put<CollectionItem>(
      `api/collectionitems/${collectionItem.id}`,
      data
    );
  }
  delete(id: number): Observable<CollectionItem> {
    return this.http.delete<CollectionItem>(`api/collectionitems/${id}`);
  }
}
