import { createAction, props } from '@ngrx/store';
import { Collection } from '../collection';
import * as ErrorActions from '../../error/state/error.actions';
import { CollectionResponse } from '../collection.service';

export const loadCollections = createAction('[Collection] Load Collections');

export const loadCollectionsSuccess = createAction(
  '[Collection] Load Collections Success',
  props<{ data: any }>()
);

export const loadCollectionsFail = createAction(
  '[Collection] Load Collections Fail',
  props<{ error: any }>()
);
export const loadCollection = createAction(
  '[Collection] Load Collection',
  props<{ id: number }>()
);
export const loadCollectionSuccess = createAction(
  '[Collection] Load Collection Success',
  props<{ data: CollectionResponse }>()
);
export const loadCollectionFail = createAction(
  '[Collection] Load Collection Fail',
  props<{ error: any }>()
);
export const createCollection = createAction(
  '[Collection] Create Collection',
  props<{ data: Collection }>()
);
export const createCollectionComplete = createAction(
  '[Collection] Create Collection Complete',
  props<{ data: Collection }>()
);
export const createCollectionFail = createAction(
  '[Collection] Create Collection Fail',
  props<{ error: any }>()
);
export const updateCollection = createAction(
  '[Collection] Update Collection',
  props<{ data: Collection }>()
);
export const updateCollectionComplete = createAction(
  '[Collection] Update Collection Complete',
  props<{ data: Collection }>()
);
export const updateCollectionFail = createAction(
  '[Collection] Update Collection Fail',
  props<{ error: any }>()
);
export const removeCollection = createAction(
  '[Collection] Remove Collection',
  props<{ id: number }>()
);
export const removeCollectionSuccess = createAction(
  '[Collection] Remove Collection Success',
  props<{ data: Collection }>()
);
export const removeCollectionFail = createAction(
  '[Collection] Remove Collection Fail',
  props<{ error: any }>()
);
export const addProductToCollection = createAction(
  '[Collection] Add Product To Collection',
  props<{ productId: number; collectionId: number }>()
);
export const addProductToCollectionComplete = createAction(
  '[Collection] Add Product To Collection Complete',
  props<{ data: Collection }>()
);

export const addProductToCollectionFail = createAction(
  '[Collection] Add Product To Collection Fail',
  props<{ error: string }>()
);

export const ERROR_ACTIONS = {
  [loadCollectionsFail.type]: ErrorActions.ErrorOutlet.APP,
  [createCollectionFail.type]: ErrorActions.ErrorOutlet.APP,
  [updateCollectionFail.type]: ErrorActions.ErrorOutlet.APP,
};
export const ERROR_CLEAR_ACTIONS = [
  loadCollections.type,
  createCollection.type,
  updateCollection.type,
];
