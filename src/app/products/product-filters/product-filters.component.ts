import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import * as ProductActions from '../state/product.actions';
import { merge } from 'rxjs';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss'],
})
export class ProductFiltersComponent implements OnInit {
  initThemeCodes: string[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const codes = this.route.snapshot.queryParamMap.get('themeCodes');
    if (codes) {
      this.initThemeCodes = codes.split(';');
    }
  }
  selectThemes(themeCodes: string[] = []) {
    let queryParams = {};

    if (themeCodes.length > 0) {
      queryParams = { themeCodes: themeCodes.join(';') };
    }
    this.router.navigate(['.'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  selectYears(years: string[] = []) {
    let queryParams = {};

    if (years.length > 0) {
      queryParams = { years: years.join(';') };
    }
    this.router.navigate(['products'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
  clearProducts() {
    this.store.dispatch(ProductActions.clearProducts());
  }
  switchDetails(detailLevel: number) {
    this.router.navigate(['.'], {
      queryParams: { dl: detailLevel },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }
}
