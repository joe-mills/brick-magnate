import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../product';

export const productFeatureKey = 'product';

export interface ProductState extends EntityState<Product> {
  loading: boolean;
  lastLoaded: string | null;
  totalRecords: number;
}
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
export const initialState: ProductState = adapter.getInitialState({
  loading: true,
  lastLoaded: null,
  totalRecords: 0,
});

export const reducer = createReducer(
  initialState,

  on(ProductActions.loadProducts, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, action) => {
    const results = action.data.results.map(
      (x) => ({ ...x, partial: true } as Product)
    );
    return adapter.addMany(results, {
      ...state,
      totalRecords: action.data.total,
      loading: false,
      lastLoaded: new Date().toUTCString(),
    });
  }),
  on(ProductActions.loadProductsFail, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProductActions.loadProduct, (state) => ({ ...state, loading: true })),
  on(ProductActions.loadProductSuccess, (state, action) => {
    const data = { ...action.data, partial: false } as Product;

    return adapter.upsertOne(data, { ...state, loading: false });
  }),
  on(ProductActions.loadProductFail, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProductActions.loadProductsComplete, (state, action) => ({
    ...state,
    loading: false,
  })),
  on(ProductActions.clearProducts, (state, action) => {
    return adapter.removeAll({ ...state, totalRecords: 0 });
  })
);
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
