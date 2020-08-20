import { Component, OnInit } from '@angular/core';
import {
  NavigationStart,
  Router,
  RoutesRecognized,
  NavigationEnd,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-loading-stripe',
  templateUrl: './loading-stripe.component.html',
  styleUrls: ['./loading-stripe.component.scss']
})
export class LoadingStripeComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    this.loading$ = this.router.events.pipe(
      map(event => {
        if (
          event instanceof NavigationStart ||
          event instanceof RoutesRecognized
        ) {
          this.messageService.error();
          return true;
        }
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel
        ) {
          return false;
        }
        return undefined;
      }),
      filter(x => x !== undefined)
    );
  }
}
