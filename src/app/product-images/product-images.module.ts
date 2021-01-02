import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductImagesPageComponent } from './product-images-page/product-images-page.component';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PageModule } from '../page/page.module';
import { SharedModule } from '../shared/shared.module';
import * as fromProductImage from './state/product-image.reducer';
import { ProductImagesListComponent } from './product-images-list/product-images-list.component';
import { ProductImageEffects } from './state/product-image.effects';
import { ProductImageFiltersComponent } from './product-images-filters/product-image-filters.component';
import { ProductImageItemComponent } from './product-image-item/product-image-item.component';
import { FiltersModule } from '../filters/filters.module';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
export const routes: Routes = [
  {
    path: '',
    component: ProductImagesPageComponent,
  },
];
@NgModule({
  declarations: [
    ProductImagesPageComponent,
    ProductImagesListComponent,
    ProductImageFiltersComponent,
    ProductImageItemComponent,
  ],
  imports: [
    CommonModule,
    PageModule,
    FormsModule,
    SharedModule,
    FiltersModule,
    MatCardModule,
    MatRadioModule,
    StoreModule.forFeature(
      fromProductImage.productImageFeatureKey,
      fromProductImage.reducer
    ),
    EffectsModule.forFeature([ProductImageEffects]),

    RouterModule.forChild(routes),
  ],
})
export class ProductImagesModule {}
