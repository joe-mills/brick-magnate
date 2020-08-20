import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeFilterComponent } from './theme-filter/theme-filter.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemeFilterChipsComponent } from './theme-filter-chips/theme-filter-chips.component';
import { YearFilterComponent } from './year-filter/year-filter.component';
import { YearFilterChipsComponent } from './year-filter-chips/year-filter-chips.component';
@NgModule({
  declarations: [
    ThemeFilterComponent,
    ThemeFilterChipsComponent,
    YearFilterComponent,
    YearFilterChipsComponent,
  ],
  exports: [ThemeFilterComponent, YearFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
})
export class FiltersModule {}
