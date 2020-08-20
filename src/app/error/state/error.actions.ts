import { createAction, props } from '@ngrx/store';
export enum ErrorOutlet {
  APP,
}

export const createError = createAction(
  '[Error] Create Error',
  props<{ errorOutlet: ErrorOutlet; error: string }>()
);

export const clearErrors = createAction('[Error] Clear Errors');
