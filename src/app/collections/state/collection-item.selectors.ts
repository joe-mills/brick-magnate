import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCollectionItem from './collection-item.reducer';
import { CollectionItem } from '../collection-item';

export const selectCollectionItemState = createFeatureSelector<
  fromCollectionItem.CollectionItemState
>(fromCollectionItem.collectionItemFeatureKey);

export const selectCollectionItems = createSelector(
  selectCollectionItemState,
  fromCollectionItem.selectAll
);

export const selectCollectionItemsByCollection = (collectionId: number) =>
  createSelector(selectCollectionItems, (collectionItems) =>
    collectionItems.filter((x) => x.collectionId === collectionId)
  );
export const selectCollectionItemsByProduct = (productId: number) =>
  createSelector(selectCollectionItems, (collectionItems) =>
    collectionItems.filter((x) => x.productId === productId)
  );
export const selectLastLoaded = createSelector(
  selectCollectionItemState,
  (collectionItemState) => collectionItemState.lastLoaded
);

export const selectCollectionQuantity = (
  productId: number,
  collectionId?: number
) =>
  createSelector(selectCollectionItems, (collectionItems: CollectionItem[]) => {
    return collectionItems
      .filter(
        (x) =>
          (collectionId > 0 ? x.collectionId === collectionId : 1 === 1) &&
          x.productId === productId
      )
      .reduce(function (a, b) {
        return a + b.quantity;
      }, 0);
  });

export const selectTest = createSelector(
  selectCollectionItemState,
  (state) => 1
);
