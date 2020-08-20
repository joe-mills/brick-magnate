import { createAction, props } from '@ngrx/store';
import { ThemeResponse } from '../theme.service';

export const loadThemes = createAction('[Theme] Load Themes');

export const loadThemesSuccess = createAction(
  '[Theme] Load Themes Success',
  props<{ data: ThemeResponse }>()
);

export const loadThemesFailure = createAction(
  '[Theme] Load Themes Failure',
  props<{ error: any }>()
);
