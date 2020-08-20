import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardComponent } from './collection-card/collection-card.component';
import { StoreModule } from '@ngrx/store';
import * as fromCollection from './state/collection.reducer';
import * as fromCollectionItem from './state/collection-item.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CollectionEffects } from './state/collection.effects';
import { CollectionCardContentComponent } from './collection-card-content/collection-card-content.component';
import { CollectionItemEffects } from './state/collection-item.effects';
import { CollectionCardItemsComponent } from './collection-card-items/collection-card-items.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CollectionTableFormComponent } from './collection-table-form/collection-table-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { CollectionPageComponent } from './collection-page/collection-page.component';
import { CollectionFormComponent } from './collection-form/collection-form.component';
import { Routes, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorModule } from '../error/error.module';
import { CollectionSummaryComponent } from './collection-summary/collection-summary.component';
import { CollectionSummaryCardComponent } from './collection-summary-card/collection-summary-card.component';
import { CollectionsPageComponent } from './collections-page/collections-page.component';
import { CollectionsListComponent } from './collections-list/collections-list.component';

@NgModule({
  declarations: [
    CollectionCardComponent,
    CollectionCardContentComponent,
    CollectionCardItemsComponent,
    CollectionTableFormComponent,
    CollectionPageComponent,
    CollectionFormComponent,
    CollectionSummaryComponent,
    CollectionSummaryCardComponent,
    CollectionsPageComponent,
    CollectionsListComponent,
  ],
  exports: [
    CollectionCardComponent,
    CollectionSummaryComponent,
    CollectionSummaryCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    ErrorModule,
    MatButtonModule,
    StoreModule.forFeature(
      fromCollection.collectionFeatureKey,
      fromCollection.reducer
    ),
    StoreModule.forFeature(
      fromCollectionItem.collectionItemFeatureKey,
      fromCollectionItem.reducer
    ),
    EffectsModule.forFeature([CollectionEffects, CollectionItemEffects]),
  ],
})
export class CollectionsModule {}
