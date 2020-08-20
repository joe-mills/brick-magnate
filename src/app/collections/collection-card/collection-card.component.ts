import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Collection } from '../collection';
import { loadCollections } from '../state/collection.actions';
import { selectCollections } from '../state/collection.selectors';
import { Product } from 'src/app/products/product';
import { createCollectionItem } from '../state/collection-item.actions';
import { CollectionItem } from '../collection-item';
import { CollectionItemState } from '../state/collection-item.reducer';
import { selectCollectionItemsByProduct } from '../state/collection-item.selectors';
import * as CollectionItemActions from '../state/collection-item.actions';
@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss'],
})
export class CollectionCardComponent implements OnInit {
  @Input() currentProduct: Product;
  @Input() collections: Collection[];
  @Input() reloadProductsOnRemove: boolean = true;
  collectionItems$: Observable<CollectionItem[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.collectionItems$ = this.store.select(
      selectCollectionItemsByProduct(this.currentProduct.id)
    );
  }

  addCurrentProduct(collectionItem: CollectionItem) {
    var data: CollectionItem = {
      id: undefined,
      collectionName: collectionItem.collectionName,
      productId: this.currentProduct.id,
      collectionId: collectionItem.collectionId,
      quantity: 1,
    };

    this.store.dispatch(
      CollectionItemActions.createCollectionItem({ data: data })
    );
  }
  removeCollectionItem(collectionItem: CollectionItem) {
    this.store.dispatch(
      CollectionItemActions.removeCollectionItem({
        id: collectionItem.id,
        reloadProductsOnRemove: this.reloadProductsOnRemove,
      })
    );
  }
  editCollectionItem(collectionItem: CollectionItem) {
    this.store.dispatch(
      CollectionItemActions.updateCollectionItem({ data: collectionItem })
    );
  }
}
