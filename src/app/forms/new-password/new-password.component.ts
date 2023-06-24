import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, resetDto } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../register/password.validators';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  error: boolean = false;
  stores: any[] =[];
  email: string = '';
  token: string = '';
  loading = false;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.email = String(params.get('email') ?? '');
      this.token = String(params.get('token') ?? '');
    })
  }

   form = new FormGroup({
   
    password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/) ]),
    confirmPassword: new FormControl('', [Validators.required, ConfirmPasswordValidator.matchPassword]),
    
   })

 get Password(){
      return this.form.get('password');
    }

    get ConfirmPassword(){
      return this.form.get('confirmPassword');
    }

   reset(){
    const dto: resetDto = {
      userName: this.email,
      token: this.token,
      password: this.Password?.value ?? '',
    }
    this.loading = true;
    this.userService.resetPassword(dto).subscribe(data => {
      console.log(data);
      this.router.navigate(['login'],{ queryParams: { success2: 'true' } });
      this.loading = false;
    },
    err => {
      console.log(err);
      this.error = true;
      this.loading = false;
      }
    );
   }
}
