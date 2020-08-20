import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromListSetting from './list-setting.reducer';
import { ProductListSetting } from '../product-list-setting';

export const selectListSettingState = createFeatureSelector<
  fromListSetting.ListSettingState
>(fromListSetting.listSettingFeatureKey);
export const selectListSettings = createSelector(
  selectListSettingState,
  fromListSetting.selectAll
);

export const selectListSettingById = (listName: string) =>
  createSelector(selectListSettings, (listSettings) => {
    var storedSetting = listSettings[listName];
    if (!storedSetting) {
      return new ProductListSetting();
    } else {
      return storedSetting;
    }
  });
