import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as ErrorActions from '../state/error.actions';
import * as CollectionActions from '../../collections/state/collection.actions';
import * as ProductActions from '../../products/state/product.actions';

const ERROR_ACTIONS = {
  ...CollectionActions.ERROR_ACTIONS,
  ...ProductActions.ERROR_ACTIONS,
};
const ERROR_CLEAR_ACTIONS = [
  ...CollectionActions.ERROR_CLEAR_ACTIONS,
  ...ProductActions.ERROR_CLEAR_ACTIONS,
];
@Injectable()
export class ErrorEffects {
  loadFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...Object.keys(ERROR_ACTIONS)),
      map((action: any) =>
        ErrorActions.createError({
          errorOutlet: ERROR_ACTIONS[action.type],
          error: JSON.stringify(action.error),
        })
      )
    )
  );
  loadClear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(...ERROR_CLEAR_ACTIONS),
      map((action) => ErrorActions.clearErrors())
    )
  );
  constructor(private actions$: Actions) {}
}
