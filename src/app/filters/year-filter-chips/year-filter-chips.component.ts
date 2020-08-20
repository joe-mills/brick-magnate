import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-year-filter-chips',
  templateUrl: './year-filter-chips.component.html',
  styleUrls: ['./year-filter-chips.component.scss'],
})
export class YearFilterChipsComponent {
  @Input() years: string[];
  @Output() yearSelected = new EventEmitter<string[]>();

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  yearCtrl = new FormControl();
  filteredYears: Observable<string[]>;
  chipYears: string[] = [];

  @ViewChild('yearInput') yearInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredYears = this.yearCtrl.valueChanges.pipe(
      startWith(null),
      map((year: string | null) =>
        year ? this._filter(year) : this.years.slice()
      )
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our year
    if ((value || '').trim()) {
      this.chipYears.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.yearCtrl.setValue(null);
  }

  remove(year: string): void {
    const index = this.chipYears.indexOf(year);

    if (index >= 0) {
      this.chipYears.splice(index, 1);
    }
    this.broadcastYears();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipYears.push(event.option.viewValue);
    this.yearInput.nativeElement.value = '';
    this.yearCtrl.setValue(null);
    this.broadcastYears();
  }
  private broadcastYears() {
    this.yearSelected.next(this.chipYears.map((x) => x));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.years.filter(
      (year) => year.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
