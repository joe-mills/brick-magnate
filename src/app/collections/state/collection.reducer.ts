import { Action, createReducer, on } from '@ngrx/store';
import * as CollectionActions from './collection.actions';
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update,
} from '@ngrx/entity';
import { Collection } from '../collection';

export const collectionFeatureKey = 'collection';

export interface CollectionState extends EntityState<Collection> {
  lastLoaded: string | null;
}
export const adapter: EntityAdapter<Collection> = createEntityAdapter<
  Collection
>();
export const initialState: CollectionState = adapter.getInitialState({
  lastLoaded: null,
});

export const reducer = createReducer(
  initialState,

  on(CollectionActions.loadCollections, (state) => state),
  on(CollectionActions.loadCollectionsSuccess, (state, action) =>
    adapter.addMany(action.data.results, {
      ...state,
      lastLoaded: new Date().toUTCString(),
    })
  ),
  on(CollectionActions.loadCollectionsFail, (state, action) => state),
  on(CollectionActions.createCollection, (state) => state),
  on(CollectionActions.createCollectionComplete, (state, action) =>
    adapter.addOne(action.data, state)
  ),
  on(CollectionActions.removeCollectionSuccess, (state, action) =>
    adapter.removeOne(action.data.id, state)
  ),
  on(CollectionActions.updateCollectionComplete, (state, action) => {
    const update: Update<Collection> = {
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
