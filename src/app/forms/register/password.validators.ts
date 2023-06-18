import { AbstractControl, ValidationErrors, FormGroup } from "@angular/forms";

export class CustomValidator {
  static matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { matchPassword: true };
    }
    
    return null;
  }
}
