import { Component, OnInit, Input } from '@angular/core';
import { Collection } from '../collection';

@Component({
  selector: 'app-collections-list',
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.scss'],
})
export class CollectionsListComponent implements OnInit {
  @Input() collections: Collection[];
  constructor() {}

  ngOnInit(): void {}
}
