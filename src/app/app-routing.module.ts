import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPageResolver } from './products/products-page.resolver';
import { AuthorizeGuard } from './api-authorization/authorize.guard';
import { CollectionPageComponent } from './collections/collection-page/collection-page.component';
import { CollectionsPageComponent } from './collections/collections-page/collections-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import(`./products/products.module`).then((m) => m.ProductsModule),
    resolve: { collections: ProductsPageResolver },
  },
  {
    path: 'collections/:id',
    component: CollectionPageComponent,
  },
  {
    path: 'collections',
    component: CollectionsPageComponent,
  },
  {
    path: 'themes',
    loadChildren: () =>
      import('./themes/themes.module').then((m) => m.ThemesModule),
  },
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
