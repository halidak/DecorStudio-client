import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, emailDto } from 'src/app/services/user.service';
import { UsernameValidator } from '../register/emailAvailability.validators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-p-email',
  templateUrl: './reset-p-email.component.html',
  styleUrls: ['./reset-p-email.component.css']
})
export class ResetPEmailComponent implements OnInit{
  error: boolean = false;
  stores: any[] =[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

   form = new FormGroup({
   
    email: new FormControl('', [Validators.required, Validators.email]),
    
   })


    get Email(){
      return this.form.get('email');
    }

    reset() {
      const email: emailDto = {
        email: this.Email?.value ?? '',
      }
    
      this.userService.requestPasswordReset(email).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['login']);
        },
        err => {
          console.log(err);
        }
      );
    }
    
    
    
    
}
