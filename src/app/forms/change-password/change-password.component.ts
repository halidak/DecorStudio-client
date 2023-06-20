import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordDto, UserService } from 'src/app/services/user.service';
import { ConfirmPasswordValidator } from '../register/password.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: any = [];
  error = false;
  success = false;
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
     const userJSON = localStorage.getItem('user');
  if (userJSON) {
     this.user = JSON.parse(userJSON);
     }
  }

  form = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/) ]),
    confirmPassword: new FormControl('', [Validators.required, ConfirmPasswordValidator.matchPassword]),
   })

    
    get Password(){
      return this.form.get('password');
    }

    get ConfirmPassword(){
      return this.form.get('confirmPassword');
    }

    get OldPassword(){
      return this.form.get('oldPassword');
    }

    refreshUserData() {
      this.form.value.confirmPassword = '';
      this.form.value.password = '';
      this.form.value.oldPassword = '';     
    }

                        
    change(){
      var pass: ChangePasswordDto = {
        oldPassword: this.form.value.oldPassword ?? '',
        newPassword: this.form.value.password ?? '',
        confirmPassword: this.form.value.confirmPassword ?? ''
      }
      console.log(pass);
      console.log(this.user.id)
      this.userService.changePassword(this.user.id, pass).subscribe(
        (res: any) => {
            this.success = true;
            this.form.reset();
        },
        (err) => {
          this.error = true;
          this.success = false;
        }
      );
    }

   
}
