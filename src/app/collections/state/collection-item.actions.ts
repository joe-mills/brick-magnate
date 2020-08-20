import { createAction, props } from '@ngrx/store';
import { CollectionItem } from '../collection-item';

export const loadCollectionItems = createAction(
  '[CollectionItem] Load CollectionItems'
);

export const loadCollectionItemsSuccess = createAction(
  '[CollectionItem] Load CollectionItems Success',
  props<{ data: any }>()
);

export const loadCollectionItemsFail = createAction(
  '[CollectionItem] Load CollectionItems Fail',
  props<{ error: any }>()
);

export const createCollectionItem = createAction(
  '[CollectionItem] Create CollectionItem',
  props<{ data: CollectionItem }>()
);
export const createCollectionItemComplete = createAction(
  '[CollectionItem] Create CollectionItem Complete',
  props<{ data: CollectionItem }>()
);
export const createCollectionItemFail = createAction(
  '[CollectionItem] Create CollectionItem Fail',
  props<{ error: any }>()
);
export const updateCollectionItem = createAction(
  '[CollectionItem] Update CollectionItem',
  props<{ data: CollectionItem }>()
);
export const updateCollectionItemComplete = createAction(
  '[CollectionItem] Update CollectionItem Complete',
  props<{ data: CollectionItem }>()
);
export const updateCollectionItemFail = createAction(
  '[CollectionItem] Update CollectionItem Fail',
  props<{ error: any }>()
);
export const removeCollectionItem = createAction(
  '[CollectionItem] Remove CollectionItem',
  props<{ id: number; reloadProductsOnRemove: boolean }>()
);
export const removeCollectionItemSuccess = createAction(
  '[CollectionItem] Remove CollectionItem Success',
  props<{ data: CollectionItem }>()
);
export const removeCollectionItemFail = createAction(
  '[CollectionItem] Remove CollectionItem Fail',
  props<{ error: any }>()
);
