import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, tap, switchMap, finalize, filter } from 'rxjs/operators';
import { SearchService } from '../search.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
  @Output() searchItemSelected = new EventEmitter<SearchItem>();
  form: FormGroup;
  filteredResults: SearchItem[];
  searchItems: SearchItem[] = [];
  isLoading = false;
  errorMsg: string;
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
    this.search.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredResults = [];
          this.isLoading = true;
        }),
        filter((x) => !!x),
        switchMap((value) =>
          this.searchService.get(value).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe((data) => {
        if (data == undefined) {
          // this.errorMsg = data.error;
          this.filteredResults = [];
        } else {
          this.errorMsg = '';
          this.filteredResults = data;
        }
      });
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
  searchItemSelect(selection: MatAutocompleteSelectedEvent) {

    const selectedItem = this.filteredResults.find(
      (x) => x.id === +selection.option.value
    );
    this.searchItemSelected.emit(selectedItem);
  }
}
