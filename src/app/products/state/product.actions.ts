import { createAction, props } from '@ngrx/store';
import { Product } from '../product';
import { ProductResponse } from '../product.service';
import { PageSources } from 'src/app/page/state/page.reducer';
import * as ErrorActions from '../../error/state/error.actions';

export const loadProductsByPage = createAction(
  '[Product] Load Products',
  props<{ source: PageSources }>()
);
export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ data: ProductResponse }>()
);

export const loadProductsFail = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const loadProduct = createAction(
  '[Product] Load Product',
  props<{ code: string }>()
);
export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ data: Product }>()
);
export const loadProductFail = createAction(
  '[Product] Load Product Fail',
  props<{ error: any }>()
);

export const loadProductsComplete = createAction(
  '[Product] Load Products Complete'
);
export const clearProducts = createAction('[Product] Clear Products');
export const ERROR_ACTIONS = {
  [loadProductsFail.type]: ErrorActions.ErrorOutlet.APP,
  [loadProductFail.type]: ErrorActions.ErrorOutlet.APP,
};
export const ERROR_CLEAR_ACTIONS = [loadProducts.type, loadProduct.type];
