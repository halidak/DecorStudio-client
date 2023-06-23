import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: boolean = false;
  constructor(private userService: UserService, @Inject(Router) private router: Router) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  login(){
    let formData = this.form.value;
    let credentials = {
      userName: formData.email,
      password: formData.password
    };
    this.userService.login(credentials).subscribe((response: any) => {
      if(response && response.token){
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.userService.setCurrentUser(response.user);
        this.router.navigate(['']);
      }
    },
    (err) => {
      this.error = true;
      console.log(err);
    }
    );
  }
}
