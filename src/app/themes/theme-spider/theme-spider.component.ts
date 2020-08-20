import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../theme';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { loadThemes } from '../state/theme.actions';
import { selectThemes } from '../state/theme.selectors';
import { SpiderService } from 'src/app/spiders/spider.service';

@Component({
  selector: 'app-theme-spider',
  templateUrl: './theme-spider.component.html',
  styleUrls: ['./theme-spider.component.scss'],
})
export class ThemeSpiderComponent implements OnInit {
  themes$: Observable<Theme[]>;
  runStatus: string;
  constructor(
    private store: Store<AppState>,
    private spiderService: SpiderService
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadThemes());
    this.themes$ = this.store.select(selectThemes);
  }
  runSpider(theme: Theme) {
    this.spiderService
      .goSpider(theme.themeCode, 'LegoShopProducts')
      .subscribe(console.log);
  }
}
