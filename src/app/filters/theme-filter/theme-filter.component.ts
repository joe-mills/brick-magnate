import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Theme } from 'src/app/themes/theme';
import { loadThemes } from 'src/app/themes/state/theme.actions';
import {
  selectThemes,
  selectLastLoaded,
} from 'src/app/themes/state/theme.selectors';

@Component({
  selector: 'app-theme-filter',
  templateUrl: './theme-filter.component.html',
  styleUrls: ['./theme-filter.component.scss'],
})
export class ThemeFilterComponent implements OnInit {
  @Input() initValues: string;
  @Output() themeSelected = new EventEmitter<string[]>();
  themes$: Observable<Theme[]>;
  lastLoaded$: Observable<string | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadThemes());
    this.themes$ = this.store.select(selectThemes);
    this.lastLoaded$ = this.store.select(selectLastLoaded);

    
  }

  selectThemes(themeCodes: string[]) {
    this.themeSelected.next(themeCodes);
  }
}
