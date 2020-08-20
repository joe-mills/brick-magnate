import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../product';
import { Collection } from 'src/app/collections/collection';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @Input() collections: Collection[];
  mainImageUrl: string;
  constructor() {}

  ngOnInit(): void {
    if (this.product) {
      this.mainImageUrl = this.product.mainImageUrl;
    }
  }
  setMainImageUrl(url: string) {
    this.mainImageUrl = url;
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes['product'];
    if (change.currentValue) {
      if (
        change.currentValue.mainImageUrl != change.previousValue?.mainImageUrl
      ) {
        this.setMainImageUrl(change.currentValue.mainImageUrl);
      }
    }
  }
}
