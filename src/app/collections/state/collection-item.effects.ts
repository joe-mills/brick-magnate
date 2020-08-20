import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  concatMapTo,
  exhaustMap,
  switchMap,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as CollectionItemActions from './collection-item.actions';
import { CollectionItemService } from '../collection-item.service';
import * as PageActions from '../../page/state/page.actions';
import * as ProductActions from '../../products/state/product.actions';
import { PageSources } from 'src/app/page/state/page.reducer';

@Injectable()
export class CollectionItemEffects {
  loadCollectionItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionItemActions.loadCollectionItems),
      concatMap(() =>
        this.collectionItemService.get().pipe(
          map((data) =>
            CollectionItemActions.loadCollectionItemsSuccess({ data })
          ),
          catchError((error) =>
            of(CollectionItemActions.loadCollectionItemsFail({ error }))
          )
        )
      )
    );
  });
  createCollectionItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionItemActions.createCollectionItem),
      concatMap((action) =>
        this.collectionItemService.post(action.data).pipe(
          concatMap((data) => [
            PageActions.clearLoadedPages({
              pageSource: PageSources.PRODUCTSCOLLECTION,
            }),
            CollectionItemActions.createCollectionItemComplete({
              data,
            }),
          ])
        )
      )
    );
  });
  removeCollectionItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionItemActions.removeCollectionItem),
      exhaustMap((action) =>
        this.collectionItemService.delete(action.id).pipe(
          concatMap((collectionItem) => {
            let returnActions = [];
            if (action.reloadProductsOnRemove) {
              returnActions = [
                ...[
                  PageActions.clearLoadedPages({
                    pageSource: PageSources.PRODUCTSCOLLECTION,
                  }),
                  ProductActions.loadProductsByPage({
                    source: PageSources.PRODUCTSCOLLECTION,
                  }),
                ],
              ];
            }
            return [
              ...returnActions,
              CollectionItemActions.removeCollectionItemSuccess({
                data: collectionItem,
              }),
            ];
          }),
          catchError((error) =>
            of(CollectionItemActions.removeCollectionItemFail({ error }))
          )
        )
      )
    );
  });

  updateCollectionItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionItemActions.updateCollectionItem),
      switchMap((action) =>
        this.collectionItemService.put(action.data).pipe(
          map((collectionItem) =>
            CollectionItemActions.updateCollectionItemComplete({
              data: collectionItem,
            })
          ),
          catchError((error) =>
            of(CollectionItemActions.updateCollectionItemFail({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private collectionItemService: CollectionItemService
  ) {}
}
