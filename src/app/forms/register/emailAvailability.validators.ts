import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';



export class UsernameValidator  {
  static createValidator(userService: UserService) : AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;

      return userService.getUserEmail(email).pipe(
        map((result: any) => (result ? { usernameAlreadyExists: true } : null))
      );
    };
  }
}
