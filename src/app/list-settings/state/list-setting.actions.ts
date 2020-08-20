import { createAction, props } from '@ngrx/store';
import { ListSetting } from '../list-setting';

export const loadListSettings = createAction('[ListSetting] Load ListSettings');

export const loadListSettingsSuccess = createAction(
  '[ListSetting] Load ListSettings Success',
  props<{ data: any }>()
);

export const loadListSettingsFailure = createAction(
  '[ListSetting] Load ListSettings Failure',
  props<{ error: any }>()
);

// export const createListSetting = createAction(
//   '[ListSetting] Create ListSetting',
//   props<{ data: ListSetting }>()
// );
export const updateListSetting = createAction(
  '[ListSetting] Update ListSetting',
  props<{ data: ListSetting }>()
);
