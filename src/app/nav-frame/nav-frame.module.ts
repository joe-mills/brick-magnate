import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavFrameComponent } from './nav-frame.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';
import { CollectionsModule } from '../collections/collections.module';
import { ApiAuthorizationModule } from '../api-authorization/api-authorization.module';
import { ErrorModule } from '../error/error.module';
import { NavFrameSearchComponent } from './nav-frame-search/nav-frame-search.component';

@NgModule({
  declarations: [NavFrameComponent, NavFrameSearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    ApiAuthorizationModule,
    MatProgressBarModule,
    MatIconModule,
    SharedModule,
    SearchModule,
    MatListModule,
    CollectionsModule,
    ErrorModule,
  ],
  exports: [NavFrameComponent],
})
export class NavFrameModule {}
