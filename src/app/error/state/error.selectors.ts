import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorOutlet } from 'src/app/error/state/error.actions';
import { ErrorState } from './error.reducer';
export const selectErrorState = createFeatureSelector<ErrorState>('error');

export const selectErrors = (errorOutlet: ErrorOutlet) =>
  createSelector(
    selectErrorState,
    errorState =>
      errorState.entities[errorOutlet]
        ? errorState.entities[errorOutlet].errorObj
        : ''
  );
