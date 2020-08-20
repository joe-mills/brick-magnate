import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductPageResolver } from './product-page.resolver';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatCardModule } from '@angular/material/card';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltersModule } from '../filters/filters.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductPagerComponent } from './product-pager/product-pager.component';
import { CollectionsModule } from '../collections/collections.module';
import * as fromProduct from './state/product.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { PageModule } from '../page/page.module';
import { ProductInfoSquaresComponent } from './product-info-squares/product-info-squares.component';
import { ProductCardCompactComponent } from './product-card-compact/product-card-compact.component';
import { ProductCardMediumComponent } from './product-card-medium/product-card-medium.component';
import { ProductDetailSwitchComponent } from './product-detail-switch/product-detail-switch.component';
import { ImagePipe } from '../shared/image.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductCollectionsDialogComponent } from './product-collections-dialog/product-collections-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthorizeGuard } from '../api-authorization/authorize.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
export const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  {
    path: ':id',
    component: ProductPageComponent,
    resolve: { product: ProductPageResolver },
  },
  {
    path: 'collection/:id',
    component: ProductsPageComponent,
    // resolve: { product: ProductPageResolver },
    canActivate: [AuthorizeGuard],
  },
];
@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductPageComponent,
    ProductDetailsComponent,
    ProductInfoComponent,
    ProductFiltersComponent,
    ProductPagerComponent,
    ProductInfoSquaresComponent,
    ProductCardCompactComponent,
    ProductCardMediumComponent,
    ProductDetailSwitchComponent,
    ProductCollectionsDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatBadgeModule,
    MatTabsModule,
    FontAwesomeModule,
    FiltersModule,
    CollectionsModule,
    PageModule,
    SharedModule,
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    EffectsModule.forFeature([ProductEffects]),

    RouterModule.forChild(routes),
  ],
})
export class ProductsModule {}
