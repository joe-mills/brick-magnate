import { Product } from './product';
import { ProductService } from './product.service';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from '../shared/message.service';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import * as fromProduct from './state/product.selectors';
import * as fromCollections from '../collections/state/collection.selectors';
import * as CollectionActions from '../collections/state/collection.actions';

import * as ProductActions from './state/product.actions';
import { map, finalize, first, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductPageResolver implements Resolve<Product> {
  loading = true;
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const code = route.params['id'];

    this.store.dispatch(ProductActions.loadProduct({ code }));
    this.store.dispatch(CollectionActions.loadCollections());

    return combineLatest(
      this.store.select(fromProduct.selectLoading),
      this.store.select(fromCollections.selectLastLoaded)
    ).pipe(
      map(([productLoading, collectionsLoaded]) => {
        return productLoading || !collectionsLoaded;
      }),
      filter((isLoading) => {
        return !isLoading;
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
