import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
// import { environment } from '../../environments/environment';

export const themeFeatureKey = 'theme';

export interface ThemeState {

}

export const reducers: ActionReducerMap<ThemeState> = {

};


export const metaReducers: MetaReducer<ThemeState>[] = !environment.production ? [] : [];
