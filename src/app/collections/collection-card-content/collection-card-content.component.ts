import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Collection } from '../collection';
import { CollectionItem } from '../collection-item';

@Component({
  selector: 'app-collection-card-content',
  templateUrl: './collection-card-content.component.html',
  styleUrls: ['./collection-card-content.component.scss'],
})
export class CollectionCardContentComponent implements OnInit, OnChanges {
  @Input() collectionItems: CollectionItem[];
  @Input() collections: Collection[];

  @Output() addCurrentProductClicked = new EventEmitter<CollectionItem>();
  @Output() removeCollectionItemClicked = new EventEmitter<CollectionItem>();
  @Output() collectionItemEdited = new EventEmitter<CollectionItem>();

  collectionGroups: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.setCollectionGroups();
  }

  setCollectionGroups() {
    this.collectionGroups = [];
    this.collections.forEach((g) => {
      const collectionItems = this.collectionItems.filter(
        (i) => i.collectionId === g.id
      );

      this.collectionGroups.push({
        collectionId: g.id,
        collectionName: g.name,
        values: collectionItems.length > 0 ? collectionItems : undefined,
      });
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.collectionItems) {
      if (changes.collectionItems.currentValue) {
        this.setCollectionGroups();
      }
    }
  }
  addCurrentProduct(collectionItem: CollectionItem) {
    this.addCurrentProductClicked.next(collectionItem);
  }
  removeCollectionItem(collectionItem: CollectionItem) {
    this.removeCollectionItemClicked.next(collectionItem);
  }
  editCollectionItem(collectionItem: CollectionItem) {
    this.collectionItemEdited.next(collectionItem);
  }
}
