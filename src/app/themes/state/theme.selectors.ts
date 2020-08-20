import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTheme from './theme.reducer';

export const selectThemeState = createFeatureSelector<fromTheme.ThemeState>(
  fromTheme.themeFeatureKey
);

export const selectThemes = createSelector(
  selectThemeState,
  fromTheme.selectAll
);

export const selectLastLoaded = createSelector(
  selectThemeState,
  (themeState) => themeState.lastLoaded
);
