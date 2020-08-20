import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import * as fromProduct from '../state/product.selectors';
import * as fromCollection from '../../collections/state/collection.selectors';
import { Collection } from 'src/app/collections/collection';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product$: Observable<Product>;
  collections$: Observable<Collection[]>;
  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product$ = this.store.select(
        fromProduct.selectProductByCode(params.get('id'))
      );
    });
    this.collections$ = this.store.select(fromCollection.selectCollections);
  }
}
