import { StoreConfig } from '@ngrx/store';

export interface ProductImage {
  id: number;
  productId: number;
  imageSrc: string;
  filename: string;
  imageTyped: string;
  alt: string;
}
