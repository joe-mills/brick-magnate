import { Action, createReducer, on } from '@ngrx/store';
import * as ListSettingActions from './list-setting.actions';
import { ListSetting } from '../list-setting';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const listSettingFeatureKey = 'list-setting';

export interface ListSettingState extends EntityState<ListSetting> {
  lastLoaded: string | null;
}
export const adapter: EntityAdapter<ListSetting> = createEntityAdapter<
  ListSetting
>({
  selectId: (listSetting) => listSetting.listName,
});
export const initialState: ListSettingState = adapter.getInitialState({
  lastLoaded: null,
});

export const reducer = createReducer(
  initialState,

  on(ListSettingActions.loadListSettings, (state) => state),
  on(ListSettingActions.loadListSettingsSuccess, (state, action) =>
    adapter.addMany(action.data, {
      ...state,
      lastLoaded: new Date().toUTCString(),
    })
  ),
  on(ListSettingActions.loadListSettingsFailure, (state, action) => state),
  on(ListSettingActions.updateListSetting, (state, action) =>
    adapter.upsertOne(action.data, { ...state })
  )
);
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = adapter.getSelectors();
