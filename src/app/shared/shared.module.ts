import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormPlaceholderComponent } from './form-placeholder/form-placeholder.component';
import { LoadingStripeComponent } from './loading-stripe/loading-stripe.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MessagesComponent } from './messages/messages.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImagePipe } from './image.pipe';
import { ImageLoaderComponent } from './image-loader/image-loader.component';
import { MaterialElevationDirective } from './material-elevation.directive';
import { PagerComponent } from './pager/pager.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    FormPlaceholderComponent,
    LoadingStripeComponent,
    MessagesComponent,
    DeleteConfirmDialogComponent,
    ImagePipe,
    ImageLoaderComponent,
    MaterialElevationDirective,
    PagerComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    FormPlaceholderComponent,
    LoadingStripeComponent,
    MessagesComponent,
    ImagePipe,
    ImageLoaderComponent,
    MaterialElevationDirective,
    PagerComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
