import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, filter, first } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import * as fromCollections from '../collections/state/collection.selectors';
import * as CollectionActions from '../collections/state/collection.actions';
import { Collection } from '../collections/collection';
@Injectable({
  providedIn: 'root',
})
export class ProductsPageResolver implements Resolve<Collection[]> {
  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(fromCollections.selectCollections),
      tap((collections) => {
        if (!collections) {
          this.store.dispatch(CollectionActions.loadCollections());
        }
      }),
      first()
    );
  }
}
