import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as ListSettingActions from './list-setting.actions';



@Injectable()
export class ListSettingEffects {

  loadListSettings$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(ListSettingActions.loadListSettings),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ListSettingActions.loadListSettingsSuccess({ data })),
          catchError(error => of(ListSettingActions.loadListSettingsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
