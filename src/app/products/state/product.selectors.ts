import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from './product.reducer';
import * as fromPage from '../../page/state/page.selectors';
import { PageSources } from 'src/app/page/state/page.reducer';

export const selectProductState = createFeatureSelector<
  fromProduct.ProductState
>(fromProduct.productFeatureKey);

export const selectProducts = createSelector(
  selectProductState,
  fromProduct.selectAll
);

export const selectLoading = createSelector(
  selectProductState,
  (productState) => productState.loading
);

export const selectLastLoaded = createSelector(
  selectProductState,
  (productState) => productState.lastLoaded
);

export const selectTotal = createSelector(
  selectProductState,
  (productState) => productState.totalRecords
);

export const selectProductByCode = (code: string) =>
  createSelector(selectProducts, (products) =>
    products.find((x) => x.productCode === code)
  );

export const selectProductsPage = (source: PageSources) =>
  createSelector(
    selectProducts,
    fromPage.selectCurrentLoadedPage(source),
    (products, loadedPage) => {
      console.log('Select current loaded page ' + source);

      if (loadedPage) {
        return products.filter((x) => loadedPage.ids.includes(x.id));
      } else {
        return [];
      }
    }
  );
