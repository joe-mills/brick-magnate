import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../product';
import { Collection } from 'src/app/collections/collection';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input() products: Product[];
  @Input() collections: Collection[];
  @Input() detailLevel;
  @Input() collectionId: number;

  @Output() productSelected = new EventEmitter<Product>();
  productsList: any[];
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.products) {
      if (changes.products.currentValue) {
        this.productsList = this.getGroupedProducts();
      }
    }
  }
  getGroupedProducts() {
    return this.products.reduce((r, { year }) => {
      if (!r.some((o) => o.year == year)) {
        r.push({
          year,
          groupItem: this.products.filter((v) => v.year == year),
        });
      }
      return r;
    }, []);
  }

  select(product: Product) {
    this.productSelected.next(product);
  }
}
