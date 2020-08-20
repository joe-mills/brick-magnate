import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-server-errors',
  templateUrl: './server-errors.component.html',
  styleUrls: ['./server-errors.component.scss']
})
export class ServerErrorsComponent implements OnChanges, OnInit {
  @Input() errorsObj: string;
  errors: string[] = [];
  SERVER_ERROR_MESSAGE = 'Server error';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    const errorsObj: SimpleChange = changes.errorsObj;
    if (errorsObj.currentValue) {
      this.handleError(errorsObj.currentValue);
    }else{
      this.errors = [];
    }
  }
  handleError(error: any) {
    let errors: string[] = [];
    if (error) {
      if (
        Array.isArray(error.error) ||
        Array.isArray((error.error || '').errors)
      ) {
        errors = error.error;
      } else {
        if (typeof error.error === 'string' || error.error instanceof String) {
          errors.push(error.error);
        } else {
          if (error.error && error.statusText !== 'Unknown Error') {
            const serverErrors = error.error.errors
              ? error.error.errors
              : error.error;
            for (const property in serverErrors) {
              if (serverErrors.hasOwnProperty(property)) {
                errors.push(`${property} : ${serverErrors[property]}`);
              }
            }
          } else {
            if (error.message) {
              errors.push(error.message);
            } else {
              errors.push(this.SERVER_ERROR_MESSAGE);
            }
          }
        }
      }
    }

    this.errors = errors;
  }
}
