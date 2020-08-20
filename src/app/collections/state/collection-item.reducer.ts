import { Action, createReducer, on } from '@ngrx/store';
import * as CollectionItemActions from './collection-item.actions';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { CollectionItem } from '../collection-item';

export const collectionItemFeatureKey = 'collectionItem';

export interface CollectionItemState extends EntityState<CollectionItem> {
  lastLoaded: string | null;
}
export const adapter: EntityAdapter<CollectionItem> = createEntityAdapter<
  CollectionItem
>();
export const initialState: CollectionItemState = adapter.getInitialState({
  lastLoaded: null,
});

export const reducer = createReducer(
  initialState,

  on(CollectionItemActions.loadCollectionItems, (state) => state),
  on(CollectionItemActions.loadCollectionItemsSuccess, (state, action) =>
    adapter.addMany(action.data, {
      ...state,
      lastLoaded: new Date().toUTCString(),
    })
  ),
  on(CollectionItemActions.loadCollectionItemsFail, (state, action) => state),

  on(CollectionItemActions.createCollectionItem, (state) => state),
  on(CollectionItemActions.createCollectionItemComplete, (state, action) =>
    adapter.addOne(action.data, state)
  ),
  on(CollectionItemActions.removeCollectionItemSuccess, (state, action) =>
    adapter.removeOne(action.data.id, state)
  ),
  on(CollectionItemActions.updateCollectionItemComplete, (state, action) => {
    const update: Update<CollectionItem> = {
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
