import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as ProductActions from './product.actions';
import * as CollectionItemActions from '../../collections/state/collection-item.actions';
import * as PageActions from '../../page/state/page.actions';
import * as fromPage from '../../page/state/page.selectors';
import { ProductService } from '../product.service';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      switchMap((action) =>
        this.productService.getByCode(action.code).pipe(
          concatMap((data) => {
            return [
              CollectionItemActions.loadCollectionItemsSuccess({
                data: data.collectionItems,
              }),
              ProductActions.loadProductSuccess({ data }),
            ];
          }),
          catchError((error) => of(ProductActions.loadProductFail({ error })))
        )
      )
    );
  });
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProductsByPage),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(
              select(fromPage.selectUnloadedPageBySource(action.source))
            )
          )
        )
      ),
      switchMap(([action, pageQuery]) => {
        if (pageQuery) {
          return this.productService
            .get(pageQuery.page, pageQuery.filters)
            .pipe(
              concatMap((data) => {
                data.results.forEach((product) => {
                  if (product.collectionItems.length > 0) {
                    this.store.dispatch(
                      CollectionItemActions.loadCollectionItemsSuccess({
                        data: product.collectionItems,
                      })
                    );
                  }
                });
                return [
                  PageActions.setPage({
                    loadedPage: {
                      source: action.source,
                      pageIndex: pageQuery.page,
                      ids: data.results.map((x) => x.id),
                    },
                    totalRecords: data.total,
                  }),
                  ProductActions.loadProductsSuccess({ data }),
                ];
              }),
              catchError((error) =>
                of(ProductActions.loadProductsFail({ error }))
              )
            );
        } else {
          return of(ProductActions.loadProductsComplete());
        }
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productService: ProductService
  ) {}
}
