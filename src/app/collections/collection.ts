import { CollectionItem } from './collection-item';

export class Collection {
  id: number;
  name: string;
  setsTotal: number;
  piecesTotal: number;
  minifigsTotal: number;
  rrpTotal: number;
  collectionItems: CollectionItem[];

  constructor() {
    this.id = 0;
  }
}
