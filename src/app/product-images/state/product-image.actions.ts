import { createAction, props } from '@ngrx/store';
import { ProductImage } from '../product-image';
import { ProductImageResponse } from '../product-image.service';
import { PageSources } from 'src/app/page/state/page.reducer';
import * as ErrorActions from '../../error/state/error.actions';

export const loadProductImagesByPage = createAction(
  '[ProductImage] Load ProductImages',
  props<{ source: PageSources }>()
);
export const loadProductImages = createAction(
  '[ProductImage] Load ProductImages'
);

export const loadProductImagesSuccess = createAction(
  '[ProductImage] Load ProductImages Success',
  props<{ data: ProductImageResponse }>()
);

export const loadProductImagesFail = createAction(
  '[ProductImage] Load ProductImages Failure',
  props<{ error: any }>()
);

export const loadProductImage = createAction(
  '[ProductImage] Load ProductImage',
  props<{ code: string }>()
);
export const loadProductImageSuccess = createAction(
  '[ProductImage] Load ProductImage Success',
  props<{ data: ProductImage }>()
);
export const loadProductImageFail = createAction(
  '[ProductImage] Load ProductImage Fail',
  props<{ error: any }>()
);

export const loadProductImagesComplete = createAction(
  '[ProductImage] Load ProductImages Complete'
);

export const updateProductImage = createAction(
  '[ProductImage] Update ProductImage',
  props<{ data: ProductImage }>()
);
export const updateProductImageComplete = createAction(
  '[ProductImage] Update ProductImage Complete',
  props<{ data: ProductImage }>()
);
export const updateProductImageFail = createAction(
  '[ProductImage] Update ProductImage Fail',
  props<{ error: any }>()
);

export const clearProductImages = createAction(
  '[ProductImage] Clear ProductImages'
);
export const ERROR_ACTIONS = {
  [loadProductImagesFail.type]: ErrorActions.ErrorOutlet.APP,
  [loadProductImageFail.type]: ErrorActions.ErrorOutlet.APP,
};
export const ERROR_CLEAR_ACTIONS = [
  loadProductImages.type,
  loadProductImage.type,
];
