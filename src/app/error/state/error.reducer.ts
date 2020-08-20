import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as errorActions from '../state/error.actions';
import { ErrorOutlet } from '../state/error.actions';
import { AppError } from '../app-error';

export interface ErrorState extends EntityState<AppError> {}
export function selectErrorId(e: AppError): ErrorOutlet {
  return e.sourceId;
}
export const adapter: EntityAdapter<AppError> = createEntityAdapter<AppError>({
  selectId: selectErrorId
});

export const initialState: ErrorState = adapter.getInitialState({});

const errorReducer = createReducer(
  initialState,
  on(errorActions.createError, (state, { errorOutlet, error }) => {
    return adapter.upsertOne(
      {
        sourceId: errorOutlet,
        errorObj: error
      },
      state
    );
  }),
  on(errorActions.clearErrors, state => adapter.removeAll(state))
);
export function reducer(state: ErrorState | undefined, action: Action) {
  return errorReducer(state, action);
}
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
