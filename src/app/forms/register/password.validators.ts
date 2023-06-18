import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ConfirmPasswordValidator {
  static matchPassword(control: AbstractControl): ValidationErrors | null {
    if(control && (control.value !== null || control.value !== undefined)){
        const cnfpassword = control.value;

        const password = control.root.get('password');
        if(password){
            const passValue = password.value;
            if(passValue !== cnfpassword){
                return { matchPassword: true }
            }
        }
    }
    return null;
  }
}
