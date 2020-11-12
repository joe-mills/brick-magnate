import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription, of } from 'rxjs';
import { Product } from '../product';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';

import * as fromProducts from '../state/product.selectors';
import * as fromPage from '../../page/state/page.selectors';
import * as fromCollections from '../../collections/state/collection.selectors';
import * as ProductActions from '../state/product.actions';
import * as PageActions from '../../page/state/page.actions';
import * as CollectionActions from '../../collections/state/collection.actions';
import { PageQuery } from 'src/app/page/page-query';
import { PageSources } from 'src/app/page/state/page.reducer';
import { Collection } from 'src/app/collections/collection';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  collection$: Observable<Collection>;
  collections: Collection[];
  total$: Observable<number>;
  loading$: Observable<boolean>;
  themeCodes: string;
  years: string;
  search: string;
  collectionId: number;
  page: number;
  pageQuery: PageQuery;
  pageSubscription: Subscription;
  pageSource = PageSources.PRODUCTS;
  detailLevel = 1;
  lastCollectionId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(map((results) => ({ params: results[0], query: results[1] })))
      .subscribe((results) => {
        console.log(results);
        this.collectionId = +results.params['id'];
        this.themeCodes = results.query['themeCodes'];
        this.years = results.query['years'];
        this.search = results.query['search'];
        this.page = results.query['p'] || 1;
        this.detailLevel = +results.query['dl'] || 1;

        const pageQuery = {
          source: this.getPageSource(),
          page: this.page,
          filters: {
            collectionId: isNaN(this.collectionId)
              ? undefined
              : this.collectionId,
            themeCodes: this.themeCodes,
            years: this.years,
            search: this.search,
          },
        } as PageQuery;

        this.store.dispatch(
          PageActions.changeFilters({
            pageQuery: pageQuery,
            skipClearFields: ['collectionId'],
          })
        );

        if (this.collectionId > 0) {
          this.store.dispatch(
            CollectionActions.loadCollection({ id: this.collectionId })
          );
          this.collection$ = this.store.select(
            fromCollections.selectCollectionById(this.collectionId)
          );
        }
        this.store.dispatch(
          ProductActions.loadProductsByPage({ source: this.getPageSource() })
        );
      });
    this.collections = this.route.snapshot.data.collections;

    this.products$ = this.store.select(
      fromProducts.selectProductsPage(this.getPageSource())
    );
    this.total$ = this.store.select(
      fromPage.selectTotalRecordsBySource(this.getPageSource())
    );
    this.loading$ = this.store.select(fromProducts.selectLoading);
  }
  getPageSource() {
    return this.collectionId > 0
      ? PageSources.PRODUCTSCOLLECTION
      : PageSources.PRODUCTS;
  }
  selectProduct(product: Product) {
    if (product) {
      this.router.navigate(['products', product.productCode]);
    }
  }
  loadNextPage() {
    this.router.navigate(['products'], {
      queryParams: { p: ++this.page },
      queryParamsHandling: 'merge',
    });
  }
  loadPreviousPage() {
    this.router.navigate(['products'], {
      queryParams: { p: --this.page },
      queryParamsHandling: 'merge',
    });
  }

  changePage() {
    this.loadNextPage();
  }

  ngOnDestroy() {
    // this.pageSubscription.unsubscribe();
  }
}
