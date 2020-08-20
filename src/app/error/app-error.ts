import { ErrorOutlet } from './state/error.actions';
export interface AppError {
  sourceId: ErrorOutlet;
  errorObj: any;
}
