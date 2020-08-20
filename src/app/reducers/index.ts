import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromTheme from '../themes/state/theme.reducer';
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  theme: fromTheme.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
