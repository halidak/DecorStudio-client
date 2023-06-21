import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { addApp } from 'src/app/services/appointments.service';
import * as moment from 'moment';
import { DateValidator } from './date.validators';


@Component({
  selector: 'app-add-app-dialog',
  templateUrl: './add-app-dialog.component.html',
  styleUrls: ['./add-app-dialog.component.css']
})
export class AddAppDialogComponent implements OnInit {
  user: any = [];
  form!: FormGroup;
  dateControl: FormControl = new FormControl();

  constructor(private dialogRef: MatDialogRef<AddAppDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }

    this.form = this.formBuilder.group({
      date: new FormControl('', [Validators.required, DateValidator.date]),
    });
  }

  onConfirm(): void {
    const selectedDate: string = this.form.value.date;
    const formattedDate: Date = new Date(selectedDate);

    const date: addApp = {
      dateTime: formattedDate,
      userId: this.user.id
    };
    this.dialogRef.close(date);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
