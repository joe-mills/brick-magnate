import { PRODUCTS, COLLECTIONS, COLLECTIONITEMS } from './test-data';
import { Product } from '../app/products/product';
import { Collection } from 'src/app/collections/collection';
import { CollectionItem } from 'src/app/collections/collection-item';

export function setupProducts(): Product[] {
  return Object.values(PRODUCTS) as Product[];
}

export function setupCollections(): Collection[] {
  return Object.values(COLLECTIONS) as Collection[];
}

export function setupCollectionItems(): CollectionItem[] {
  return Object.values(COLLECTIONITEMS) as CollectionItem[];
}

export function setupCollectionItemIds(): number[] {
  return setupCollectionItems().map((x) => x.id);
}
