import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDto, UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  user: any = [];
  id: string = "";
  image: string = "";
  error = false;
  success = false;
  imageData: string | null = null;

  constructor(public userService: UserService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) { }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProfile();
        this.router.navigate(['']);
      }
    });
  }
  
  ngOnInit(): void {
    this.Email?.disable();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.userService.getUserById(this.id).subscribe(data => {
        this.user = data;
        this.image = this.user.image;
        this.updateProfileForm.patchValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phoneNumber: this.user.phoneNumber,
        })
      })
    })
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageData = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  
  refreshUserData() {
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      this.image = this.user.image;
      this.updateProfileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
      });
      this.imageData = null; // Resetujte izabranu sliku nakon ažuriranja profila
    });
  }

  updateProfileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
   })

    get FirstName(){
      return this.updateProfileForm.get('firstName');
    }

    get LastName(){
      return this.updateProfileForm.get('lastName');
    }

    get Email(){
      return this.updateProfileForm.get('email');
    }

    get PhoneNumber(){
      return this.updateProfileForm.get('phoneNumber');
    }

    update() {
     
      if (this.imageData) {
        const formData = new FormData();
        formData.append('image', this.imageData);
        const u: UpdateDto = {
          firstName: this.FirstName?.value ?? '',
          lastName: this.LastName?.value ?? '',
          phoneNumber: this.PhoneNumber?.value ?? '',
          image: this.imageData
        };
        this.userService.updateUser(this.id, u).subscribe(response => {
          this.refreshUserData();
          this.success = true;
        },
        error => {
          this.error = true;
          });
      } else {
        const u: UpdateDto = {
          firstName: this.FirstName?.value ?? '',
          lastName: this.LastName?.value ?? '',
          phoneNumber: this.PhoneNumber?.value ?? '',
          image: this.user.image
        };
        this.userService.updateUser(this.id, u).subscribe(response => {
          this.refreshUserData();
          this.success = true;
        },
        error => {
          this.error = true;
          });
      }
    }

    deleteProfile(){
      this.userService.deleteUser(this.id).subscribe(data => {
        this.userService.logout();
      })
    }
}
