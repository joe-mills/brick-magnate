import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromListSetting from './state/list-setting.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ListSettingEffects } from './state/list-setting.effects';
import { GroupSettingComponent } from './group-setting/group-setting.component';
import { SortSettingComponent } from './sort-setting/sort-setting.component';



@NgModule({
  declarations: [GroupSettingComponent, SortSettingComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromListSetting.listSettingFeatureKey, fromListSetting.reducer),
    EffectsModule.forFeature([ListSettingEffects])
  ]
})
export class ListSettingsModule { }
