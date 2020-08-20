import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { loadCollections } from '../collections/state/collection.actions';
import { Collection } from '../collections/collection';
import { selectCollections } from '../collections/state/collection.selectors';
import { ErrorOutlet } from '../error/state/error.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-frame',
  templateUrl: './nav-frame.component.html',
  styleUrls: ['./nav-frame.component.scss'],
})
export class NavFrameComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  collections$: Observable<Collection[]>;
  errorOutlet = ErrorOutlet.APP;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(loadCollections());
    this.collections$ = this.store.select(selectCollections);
  }

}
