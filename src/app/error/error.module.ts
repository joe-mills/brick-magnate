import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ErrorEffects } from './state/error.effects';
import { ErrorAlertComponent } from './error-alert/error-alert.component';
import { ErrorsPipe } from './error.pipe';
import * as fromError from './state/error.reducer';
import { ServerErrorsComponent } from './server-errors/server-errors.component';

@NgModule({
  declarations: [ServerErrorsComponent, ErrorAlertComponent, ErrorsPipe],
  exports: [ServerErrorsComponent, ErrorAlertComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('error', fromError.reducer),
    EffectsModule.forFeature([ErrorEffects]),
  ],
})
export class ErrorModule {}
