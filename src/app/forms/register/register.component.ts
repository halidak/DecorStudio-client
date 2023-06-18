import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto, UserService } from 'src/app/services/user.service';
import { CustomValidator } from './password.validators';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error: boolean = false;
  showSelect = false;
  hideSelect = true;
  selectedVaue: string = "";
  storesLoaded = false;
  stores: any[] =[];

  constructor(private userService: UserService, private router: Router, private storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.getStores().subscribe((data: any) => {
      this.stores = data;
      this.storesLoaded = true;
    },
    (error: any) => {
      console.error('Error fetching stores:', error);
      this.storesLoaded = true; 
    })
  }

   registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
   },
   {
      validators: CustomValidator.matchPassword
   })

    get FirstName(){
      return this.registerForm.get('firstName');
    }

    get LastName(){
      return this.registerForm.get('lastName');
    }

    get Email(){
      return this.registerForm.get('email');
    }

    get Password(){
      return this.registerForm.get('password');
    }

    get ConfirmPassword(){
      return this.registerForm.get('confirmPassword');
    }

    get PhoneNumber(){
      return this.registerForm.get('phoneNumber');
    }

    onOptionChange(event: any) {
      const selectedValue = event.target.value;
      console.log('Selected option:', selectedValue);
      
      if (selectedValue === '3') {
        this.showSelect = false;
      } else {
        this.showSelect = true;
      }
    }


    register(){
      if(this.registerForm.valid){
        const dto: RegisterDto = {
          firstName: this.FirstName?.value ?? '',
          lastName: this.LastName?.value ?? '',
          userName: this.Email?.value ?? '',
          phoneNumber: this.PhoneNumber?.value ?? '',
          password: this.Password?.value ?? '',
          storeId: +(document.getElementById('workplace') as HTMLInputElement).value,
          roleId: +(document.getElementById('role') as HTMLInputElement).value
        }
        this.userService.register(dto).subscribe((data: any) => {
          console.log('User registered successfully:', data);
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Error registering user:', error);
          this.error = true;
        })
      }
    }

}
