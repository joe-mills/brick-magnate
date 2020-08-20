import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from '../collection';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import * as fromCollections from '../state/collection.selectors';
@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.scss'],
})
export class CollectionsPageComponent implements OnInit {
  collections$: Observable<Collection[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.collections$ = this.store.select(fromCollections.selectCollections);
  }
}
