import { Action, createReducer, on } from '@ngrx/store';
import * as ProductImageActions from './product-image.actions';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { ProductImage } from '../product-image';

export const productImageFeatureKey = 'productImage';

export interface ProductImageState extends EntityState<ProductImage> {
  loading: boolean;
  lastLoaded: string | null;
  totalRecords: number;
}
export const adapter: EntityAdapter<ProductImage> = createEntityAdapter<
  ProductImage
>();
export const initialState: ProductImageState = adapter.getInitialState({
  loading: true,
  lastLoaded: null,
  totalRecords: 0,
});

export const reducer = createReducer(
  initialState,

  on(ProductImageActions.loadProductImages, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductImageActions.loadProductImagesSuccess, (state, action) => {
    const results = action.data.results.map(
      (x) => ({ ...x, partial: true } as ProductImage)
    );
    return adapter.addMany(results, {
      ...state,
      totalRecords: action.data.total,
      loading: false,
      lastLoaded: new Date().toUTCString(),
    });
  }),
  on(ProductImageActions.loadProductImagesFail, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProductImageActions.loadProductImage, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProductImageActions.loadProductImageSuccess, (state, action) => {
    const data = { ...action.data, partial: false } as ProductImage;

    return adapter.upsertOne(data, { ...state, loading: false });
  }),
  on(ProductImageActions.loadProductImageFail, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProductImageActions.loadProductImagesComplete, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProductImageActions.clearProductImages, (state, action) => {
    return adapter.removeAll({ ...state, totalRecords: 0 });
  }),
  on(ProductImageActions.updateProductImageComplete, (state, action) => {
    const update: Update<ProductImage> = {
      id: action.data.id,
      changes: action.data,
    };
    return adapter.updateOne(update, state);
  })
);
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
