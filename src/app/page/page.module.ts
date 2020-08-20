import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromPage from './state/page.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PageEffects } from './state/page.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('page', fromPage.reducer),
    EffectsModule.forFeature([PageEffects])
  ]
})
export class PageModule { }
