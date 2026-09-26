import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorResponseMessageBuilder {

  public build(errorResponse: any, fieldLabels: Record<string, string>): string {
    if (!errorResponse?.errors) {
      return 'An unexpected error occurred. Please try again.';
    }

    const errors = errorResponse.errors;
    const errorMessages = Object.entries(errors)
      .map(([field, message]) => {
        const label = fieldLabels[field] || field;
        return `<li><b>${label}</b>: ${message}</li>`;
      });

    return `<ul>${errorMessages.join(" ")}</ul`;
  }
}
