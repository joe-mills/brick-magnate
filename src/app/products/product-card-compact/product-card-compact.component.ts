import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../product';
import { MatDialog } from '@angular/material/dialog';
import { ProductCollectionsDialogComponent } from '../product-collections-dialog/product-collections-dialog.component';
import { Collection } from 'src/app/collections/collection';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import * as fromCollectionItems from '../../collections/state/collection-item.selectors';

@Component({
  selector: 'app-product-card-compact',
  templateUrl: './product-card-compact.component.html',
  styleUrls: ['./product-card-compact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardCompactComponent implements OnInit {
  @Input() product: Product;
  @Input() collections: Collection[];
  @Input() collectionId: number;
  collectionItemQuantity$: Observable<number>;
  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    if (this.product) {
      this.loadData();
    }
  }

  loadData() {
    this.collectionItemQuantity$ = this.store.select(
      fromCollectionItems.selectCollectionQuantity(
        this.product.id,
        this.collectionId
      )
    );
  }

  addToCollection(product: Product) {
    const dialogRef = this.dialog.open(ProductCollectionsDialogComponent, {
      width: '650px',
      autoFocus: false,
      data: { product: this.product, collections: this.collections },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
