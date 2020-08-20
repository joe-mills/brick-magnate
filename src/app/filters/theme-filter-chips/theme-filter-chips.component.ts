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
import { Theme } from 'src/app/themes/theme';

@Component({
  selector: 'app-theme-filter-chips',
  templateUrl: './theme-filter-chips.component.html',
  styleUrls: ['./theme-filter-chips.component.scss'],
})
export class ThemeFilterChipsComponent implements OnInit {
  @Input() themes: Theme[] = [];
  @Input() initValues: string[] = [];
  @Output() themeSelected = new EventEmitter<string[]>();
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  themeCtrl = new FormControl();
  filteredThemes: Observable<Theme[]>;
  chipThemes: Theme[] = [];
  @ViewChild('themeInput') themeInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor() {}

  ngOnInit(): void {
    this.filteredThemes = this.themeCtrl.valueChanges.pipe(
      startWith(null),
      map((value) =>
        typeof value === 'string' || !value ? value : value.themeCode
      ),
      map((theme) =>
        theme ? this._filter(theme) : (this.themes || []).slice()
      )
    );
    if (this.initValues) {
      this.initValues.forEach((value) => {
        this.addValue(value);
      });
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    this.addValue(event.value);
    if (input) {
      input.value = '';
    }
  }

  private addValue(value: string) {
    const valueObj = this.findTheme(value);
    // Add our fruit
    if (value) {
      this.chipThemes.push(valueObj);
    }
    // Reset the input value

    this.themeCtrl.setValue(null);
  }

  remove(themeCode: string): void {
    const index = this.chipThemes.findIndex((x) => x.themeCode === themeCode);

    if (index >= 0) {
      this.chipThemes.splice(index, 1);
      this.broadcastThemes();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const viewValue = this.findTheme(event.option.value.themeCode);
    this.chipThemes.push(viewValue);
    this.themeInput.nativeElement.value = '';
    this.themeCtrl.setValue(null);
    this.broadcastThemes();
  }

  private _filter(value: string): Theme[] {
    const filterValue = value.toLowerCase();

    return this.themes.filter(
      (theme) => theme.name.toLowerCase().indexOf(filterValue) === 0
    );
  }
  private findTheme(themeCode: string): Theme {
    return this.themes.find((x) => x.themeCode === themeCode);
  }
  private broadcastThemes() {
    this.themeSelected.next(this.chipThemes.map((x) => x.themeCode));
  }
  displayTheme(theme?: Theme): string | undefined {
    if (typeof theme === 'string') {
      return theme;
    }
    return theme ? theme.name : undefined;
  }
}
