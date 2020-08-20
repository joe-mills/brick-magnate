import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesPageComponent } from './themes-page/themes-page.component';
import { Routes, RouterModule } from '@angular/router';
import { ThemesListComponent } from './themes-list/themes-list.component';
import { MatButtonModule } from '@angular/material/button';
import { ThemeCardComponent } from './theme-card/theme-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { ThemeSpiderComponent } from './theme-spider/theme-spider.component';

export const routes: Routes = [
  {
    path: '',
    component: ThemesPageComponent,
  },
  {
    path: 'theme-spider',
    component: ThemeSpiderComponent,
  },
];
@NgModule({
  declarations: [
    ThemesPageComponent,
    ThemesListComponent,
    ThemeCardComponent,
    ThemeSpiderComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
    RouterModule.forChild(routes),
    // StoreModule.forFeature(fromTheme.themeFeatureKey, fromTheme.reducer),
    // EffectsModule.forFeature([ThemeEffects]),
  ],
})
export class ThemesModule {}
