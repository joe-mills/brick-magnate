import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ErrorOutlet } from '../state/error.actions';
import { selectErrors } from '../state/error.selectors';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
})
export class ErrorAlertComponent implements OnInit {
  @Input() errorOutlet: ErrorOutlet;
  error$: Observable<string>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.error$ = this.store.select(selectErrors(this.errorOutlet));

    this.router.events.subscribe((navigationEnd: NavigationStart) => {
      // this.store.dispatch(errorActions.clearErrors());
    });
  }
}
