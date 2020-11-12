import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageQuery } from 'src/app/page/page-query';
import { PageSources } from 'src/app/page/state/page.reducer';
import { AppState } from 'src/app/reducers';
import { ProductImage } from '../../product-images/product-image';
import * as fromProductImages from '../state/product-image.selectors';
import * as fromPage from '../../page/state/page.selectors';
import * as ProductImageActions from '../state/product-image.actions';
import * as PageActions from '../../page/state/page.actions';
@Component({
  selector: 'app-product-images-page',
  templateUrl: './product-images-page.component.html',
  styleUrls: ['./product-images-page.component.scss'],
})
export class ProductImagesPageComponent implements OnInit {
  productImages$: Observable<ProductImage[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  themeCodes: string;
  years: string;
  search: string;
  collectionId: number;
  page: number;
  pageQuery: PageQuery;
  pageSubscription: Subscription;
  pageSource = PageSources.PRODUCTIMAGES;
  detailLevel = 1;
  lastCollectionId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams])
      .pipe(map((results) => ({ params: results[0], query: results[1] })))
      .subscribe((results) => {
        console.log(results);
        this.themeCodes = results.query['themeCodes'];
        this.years = results.query['years'];
        this.search = results.query['search'];
        this.page = results.query['p'] || 1;

        const pageQuery = {
          source: this.pageSource,
          page: this.page,
          filters: {
            themeCodes: this.themeCodes,
            years: this.years,
            search: this.search,
          },
        } as PageQuery;

        this.store.dispatch(
          PageActions.changeFilters({
            pageQuery: pageQuery,
            skipClearFields: [],
          })
        );

        this.store.dispatch(
          ProductImageActions.loadProductImagesByPage({
            source: this.pageSource,
          })
        );
      });

    this.productImages$ = this.store.select(
      fromProductImages.selectProductImagesPage(this.pageSource)
    );
    this.total$ = this.store.select(
      fromPage.selectTotalRecordsBySource(this.pageSource)
    );
    this.loading$ = this.store.select(fromProductImages.selectLoading);
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

  updateImage(productImage: ProductImage) {
    this.store.dispatch(
      ProductImageActions.updateProductImage({ data: productImage })
    );
  }

  changePage() {
    this.loadNextPage();
  }

  ngOnDestroy() {
    // this.pageSubscription.unsubscribe();
  }
}
