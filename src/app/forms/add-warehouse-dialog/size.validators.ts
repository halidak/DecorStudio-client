import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class customValidator {
    static valueInvalid(control: AbstractControl) : ValidationErrors | null{
  const value = control.value;
  if (value <= 0) {
    return { valueInvalid: true };
  }
  return null;
}
}
