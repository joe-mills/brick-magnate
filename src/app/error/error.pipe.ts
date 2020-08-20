import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'errors' })
export class ErrorsPipe implements PipeTransform {
  transform(error: any): string[] {
    let errors: string[] = [];
    if (typeof error === 'string') {
      error = JSON.parse(error);
    }
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
            }
            if (error.serverError) {
              errors.push(error.serverError);
            }
            // else {
            //   errors.push(this.SERVER_ERROR_MESSAGE);
            // }
          }
        }
      }
    }
    return errors;
  }
}
