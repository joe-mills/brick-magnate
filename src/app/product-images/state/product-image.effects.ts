import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { of } from 'rxjs';

import * as ProductImageActions from './product-image.actions';
import * as PageActions from '../../page/state/page.actions';
import * as fromPage from '../../page/state/page.selectors';
import { ProductImageService } from '../product-image.service';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';

@Injectable()
export class ProductImageEffects {
  loadProductImages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductImageActions.loadProductImagesByPage),
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
          return this.productImageService
            .get(pageQuery.page, pageQuery.filters)
            .pipe(
              concatMap((data) => {
                return [
                  PageActions.setPage({
                    loadedPage: {
                      source: action.source,
                      pageIndex: pageQuery.page,
                      ids: data.results.map((x) => x.id),
                    },
                    totalRecords: data.total,
                  }),
                  ProductImageActions.loadProductImagesSuccess({ data }),
                ];
              }),
              catchError((error) =>
                of(ProductImageActions.loadProductImagesFail({ error }))
              )
            );
        } else {
          return of(ProductImageActions.loadProductImagesComplete());
        }
      })
    );
  });

  updateProductImage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductImageActions.updateProductImage),
      switchMap((action) =>
        this.productImageService.put(action.data).pipe(
          map((ProductImage) =>
            ProductImageActions.updateProductImageComplete({
              data: ProductImage,
            })
          ),
          catchError((error) =>
            of(ProductImageActions.updateProductImageFail({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private productImageService: ProductImageService
  ) {}
}
