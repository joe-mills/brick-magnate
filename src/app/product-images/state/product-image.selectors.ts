import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductImage from './product-image.reducer';
import * as fromPage from '../../page/state/page.selectors';
import { PageSources } from 'src/app/page/state/page.reducer';

export const selectProductImageState = createFeatureSelector<
  fromProductImage.ProductImageState
>(fromProductImage.productImageFeatureKey);

export const selectProductImages = createSelector(
  selectProductImageState,
  fromProductImage.selectAll
);

export const selectLoading = createSelector(
  selectProductImageState,
  (productImageState) => productImageState.loading
);

export const selectLastLoaded = createSelector(
  selectProductImageState,
  (productImageState) => productImageState.lastLoaded
);

export const selectTotal = createSelector(
  selectProductImageState,
  (productImageState) => productImageState.totalRecords
);

export const selectProductImagesPage = (source: PageSources) =>
  createSelector(
    selectProductImages,
    fromPage.selectCurrentLoadedPage(source),
    (productImages, loadedPage) => {
      console.log('Select current loaded page ' + source);

      if (loadedPage) {
        return productImages.filter((x) => loadedPage.ids.includes(x.id));
      } else {
        return [];
      }
    }
  );
