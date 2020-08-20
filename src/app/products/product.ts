import { ProductImage } from './product-image';
import { ProductLink } from './product-link';
import { ProductCategory } from './product-category';
import { Collection } from '../collections/collection';
import { CollectionItem } from '../collections/collection-item';
import { Inventory } from '../inventories/inventory';

export class Product {
  id: number;
  name: string;
  productCode: string;
  price: number | null;
  ages: string;
  piecesCount: number | null;
  vipPoints: number | null;
  limit?: number | null;
  legoShopProductPage?: string;
  year: string;
  // minifigs: number | null;
  themeId: number;
  // legoShopImageUrl: string;
  themeName: string;
  themeImageUrl: string;
  productImages: ProductImage[];
  productLinks: ProductLink[];
  productCategories: ProductCategory[];
  collectionItems: CollectionItem[];
  inventory?: Inventory;
  partial: boolean;
  mainImageUrl: string;
}
