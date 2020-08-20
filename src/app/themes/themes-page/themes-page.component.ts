import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../theme';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { loadThemes } from '../state/theme.actions';
import { selectThemes } from '../state/theme.selectors';
import { SpiderService } from 'src/app/spiders/spider.service';

@Component({
  selector: 'app-themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.scss'],
})
export class ThemesPageComponent implements OnInit {
  themes$: Observable<Theme[]>;

  constructor(
    // private spiderService: SpiderService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadThemes());
    this.themes$ = this.store.select(selectThemes);
  }

  selectTheme(theme: Theme) {
    if (theme) {
      this.router.navigate(['products'], {
        queryParams: { themeCodes: theme.themeCode },
      });
    }
  }
  // runSpider(theme: Theme) {
  //   this.spiderService
  //     .goSpider(theme.themeCode, 'LegoShopProducts')
  //     .subscribe(console.log);
  // }
}
