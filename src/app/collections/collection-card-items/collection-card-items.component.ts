import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';
import { selectCollectionItemsByCollection } from '../state/collection-item.selectors';
import { CollectionItem } from '../collection-item';

@Component({
  selector: 'app-collection-card-items',
  templateUrl: './collection-card-items.component.html',
  styleUrls: ['./collection-card-items.component.scss'],
})
export class CollectionCardItemsComponent implements OnInit {
  @Input() collectionId: number;
  collectionItems$: Observable<CollectionItem[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.collectionItems$ = this.store.select(
      selectCollectionItemsByCollection(this.collectionId)
    );
  }
}
