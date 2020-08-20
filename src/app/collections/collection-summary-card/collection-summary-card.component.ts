import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Collection } from '../collection';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/shared/delete-confirm-dialog/delete-confirm-dialog.component';
import { AppState } from 'src/app/reducers';
import * as CollectionActions from '../../collections/state/collection.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-collection-summary-card',
  templateUrl: './collection-summary-card.component.html',
  styleUrls: ['./collection-summary-card.component.scss'],
})
export class CollectionSummaryCardComponent implements OnInit {
  @Input() collection: Collection;
  @Output() deleteCollectionClicked = new EventEmitter<Collection>();
  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {}
  // deleteCollection(collection: Collection) {
  //   this.deleteCollectionClicked.next(collection);
  // }
  deleteCollection(collection: Collection) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: collection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          CollectionActions.removeCollection({ id: result.id })
        );
      }
    });
  }
}
