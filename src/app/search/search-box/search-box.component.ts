import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  filter,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';
import { SearchService } from '../search.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, concat, of, Subject } from 'rxjs';
export interface SearchItem {
  id: number;
  name: string;
  imageUrl: string;
  exactMatch: boolean;
  searchItemType: string;
  productCode: string;
  price: number;
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit {
  // cities = [
  //   {
  //     id: 1,
  //     name: 'Vilnius',
  //     avatar:
  //       '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
  //   },
  //   {
  //     id: 2,
  //     name: 'Kaunas',
  //     avatar:
  //       '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15',
  //   },
  //   {
  //     id: 3,
  //     name: 'Pavilnys',
  //     avatar:
  //       '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15',
  //   },
  //   {
  //     id: 4,
  //     name: 'Siauliai',
  //     avatar:
  //       '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x',
  //   },
  // ];

  @Output() searchItemSelected = new EventEmitter<SearchItem>();
  form: FormGroup;
  filteredResults: SearchItem[];
  searchItems$: Observable<SearchItem[]>;
  searchInput$ = new Subject<string>();
  searchItems: SearchItem[] = [];
  isLoading = false;
  errorMsg: string;
  selectedCity;
  searchLoading = false;
  get search() {
    return this.form.get('search');
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    // this.search.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     tap(() => {
    //       this.errorMsg = '';
    //       this.filteredResults = [];
    //       this.isLoading = true;
    //     }),
    //     filter((x) => !!x),
    //     switchMap((value) =>
    //       this.searchService.get(value).pipe(
    //         finalize(() => {
    //           this.isLoading = false;
    //         })
    //       )
    //     )
    //   )
    //   .subscribe((data) => {
    //     if (data == undefined) {
    //       // this.errorMsg = data.error;
    //       this.filteredResults = [];
    //     } else {
    //       this.errorMsg = '';
    //       this.filteredResults = [...this.filteredResults, ...data];
    //     }
    //   });
    this.loadSearch();
  }

  private loadSearch() {
    this.searchItems$ = concat(
      of([]), // default items
      this.searchInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.searchLoading = true)),
        switchMap((term) =>
          this.searchService.get(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.searchLoading = false))
          )
        )
      )
    );
  }
  buildForm() {
    this.form = this.fb.group({
      search: '',
    });
  }
  onSubmit() {
    const queryParams = { search: this.form.value.search };
    this.router.navigate(['/products'], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
  searchItemSelect(selection: SearchItem) {
    this.searchInput$.next('');
    if (selection) {
      this.searchItemSelected.emit(selection);
    }
  }
}
