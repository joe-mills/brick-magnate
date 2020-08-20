export interface CollectionItem {
  id: number;
  productId: number;
  collectionName: string;
  collectionId: number;
  quantity: number;
  productName?: string;
  productCode?: string;
  purchasePrice?: number;
  purchaseDate?: Date;
}
