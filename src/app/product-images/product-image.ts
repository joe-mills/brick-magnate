import { StoreConfig } from '@ngrx/store';

export interface ProductImage {
  id: number;
  productId: number;
  productName: string;
  productCode: string;
  imageSrc: string;
  filename: string;
  imageType: string;
  alt: string;
}
