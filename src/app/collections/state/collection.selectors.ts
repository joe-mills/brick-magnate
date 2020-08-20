import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollection from './collection.reducer';
import { Collection } from '../collection';

export const selectCollectionState = createFeatureSelector<
  fromCollection.CollectionState
>(fromCollection.collectionFeatureKey);

export const selectCollections = createSelector(
  selectCollectionState,
  fromCollection.selectAll
);

export const selectCollectionById = (id: number) =>
  createSelector(selectCollectionState, (state) =>
    id === 0 ? new Collection() : state.entities[id]
  );

export const selectLastLoaded = createSelector(
  selectCollectionState,
  (collectionState) => collectionState.lastLoaded
);
