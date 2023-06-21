import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DateValidator {
  static date(control: AbstractControl): ValidationErrors | null {
    if (control && (control.value !== null || control.value !== undefined)) {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
        return { date: true };
      }
    }
    return null;
  }
}
