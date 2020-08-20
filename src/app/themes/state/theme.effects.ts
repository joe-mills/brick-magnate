import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import * as fromThemes from './theme.selectors';

import * as ThemeActions from './theme.actions';
import { ThemeService } from '../theme.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { of } from 'rxjs';

@Injectable()
export class ThemeEffects {
  loadThemes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.loadThemes),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(fromThemes.selectThemes)))
        )
      ),
      switchMap(([action, themes]) => {
        if (themes.length > 0) {
          const data = { results: themes, total: themes.length };
          return of(ThemeActions.loadThemesSuccess({ data }));
        } else {
          return this.themeService.get().pipe(
            map((data) => ThemeActions.loadThemesSuccess({ data })),
            catchError((error) => of(ThemeActions.loadThemesFailure({ error })))
          );
        }
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private themeService: ThemeService
  ) {}
}
