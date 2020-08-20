import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  concatMapTo,
  switchMap,
  exhaustMap,
  withLatestFrom,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as fromCollections from './collection.selectors';

import * as CollectionActions from './collection.actions';
import * as CollectionItemActions from './collection-item.actions';
import { CollectionService } from '../collection.service';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class CollectionEffects {
  loadCollections$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.loadCollections),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.store.pipe(select(fromCollections.selectCollections))
          )
        )
      ),
      concatMap(([action, collections]) => {
        if (collections.length > 0) {
          return of(
            CollectionActions.loadCollectionsSuccess({
              data: {
                results: collections,
              },
            })
          );
        }
        return this.collectionService.get().pipe(
          map((data) => {
            data.results.forEach((collection) => {
              this.store.dispatch(
                CollectionItemActions.loadCollectionItemsSuccess({
                  data: collection.collectionItems,
                })
              );
            });
            return CollectionActions.loadCollectionsSuccess({
              data,
            });
          }),
          catchError((error) =>
            of(CollectionActions.loadCollectionsFail({ error }))
          )
        );
      })
    );
  });

  createCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.createCollection),
      concatMap((action) =>
        this.collectionService.post(action.data).pipe(
          map((collection) => {
            this.router.navigate(['products/collection', collection.id]);

            return CollectionActions.createCollectionComplete({
              data: collection,
            });
          }),
          catchError((error) =>
            of(CollectionActions.createCollectionFail({ error }))
          )
        )
      )
    );
  });
  removeCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.removeCollection),
      exhaustMap((action) =>
        this.collectionService.delete(action.id).pipe(
          map((collection) => {
            this.router.navigate(['collections']);
            return CollectionActions.removeCollectionSuccess({
              data: collection,
            });
          }),
          catchError((error) =>
            of(CollectionActions.removeCollectionFail({ error }))
          )
        )
      )
    );
  });

  updateCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CollectionActions.updateCollection),
      switchMap((action) =>
        this.collectionService.put(action.data).pipe(
          map((collection) => {
            this.router.navigate(['products/collection', collection.id]);

            return CollectionActions.updateCollectionComplete({
              data: collection,
            });
          }),
          catchError((error) =>
            of(CollectionActions.updateCollectionFail({ error }))
          )
        )
      )
    );
  });

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store<AppState>,
    private collectionService: CollectionService
  ) {}
}
