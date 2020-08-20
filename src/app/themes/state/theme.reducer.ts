import { Action, createReducer, on } from '@ngrx/store';
import * as ThemeActions from './theme.actions';
import { Theme } from '../theme';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const themeFeatureKey = 'theme';

export interface ThemeState extends EntityState<Theme> {
  lastLoaded: string | null;
}
export const adapter: EntityAdapter<Theme> = createEntityAdapter<Theme>();
export const initialState: ThemeState = adapter.getInitialState({
  lastLoaded: null,
});

export const reducer = createReducer(
  initialState,

  on(ThemeActions.loadThemes, (state) => state),
  on(ThemeActions.loadThemesSuccess, (state, action) =>
    adapter.addMany(action.data.results, {
      ...state,
      lastLoaded: new Date().toUTCString(),
    })
  ),
  on(ThemeActions.loadThemesFailure, (state, action) => state)
);
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
