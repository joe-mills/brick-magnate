import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as fromCollection from '../state/collection.selectors';
import * as CollectionActions from '../state/collection.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent implements OnInit {
  collection$: Observable<Collection>;
  collectionId: number;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.collectionId = +params['id'];
      this.collection$ = this.store.select(
        fromCollection.selectCollectionById(this.collectionId)
      );
    });
  }
  saveCollection(collection: Collection) {
    if (collection.id === 0) {
      this.store.dispatch(
        CollectionActions.createCollection({ data: collection })
      );
    } else {
      this.store.dispatch(
        CollectionActions.updateCollection({ data: collection })
      );
    }
  }
}
