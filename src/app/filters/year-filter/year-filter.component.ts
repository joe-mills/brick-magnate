import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-year-filter',
  templateUrl: './year-filter.component.html',
  styleUrls: ['./year-filter.component.scss'],
})
export class YearFilterComponent implements OnInit {
  @Output() yearSelected = new EventEmitter<string[]>();
  years$: Observable<string[]>;
  lastLoaded$: Observable<string | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // this.store.dispatch(loadYears());
    // this.years$ = this.store.select(selectYears);
    // this.lastLoaded$ = this.store.select(selectLastLoaded);

    this.lastLoaded$ = of('test');
    this.years$ = of(['2015', '2016', '5017', '2018', '2019', '2020']);
  }

  selectYears(yearCodes: string[]) {
    this.yearSelected.next(yearCodes);
  }
}
