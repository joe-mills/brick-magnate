import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../collection';

@Component({
  selector: 'app-collection-summary',
  templateUrl: './collection-summary.component.html',
  styleUrls: ['./collection-summary.component.scss'],
})
export class CollectionSummaryComponent implements OnInit {
  @Input() collection: Collection;
  constructor() {}

  ngOnInit(): void {}
}
