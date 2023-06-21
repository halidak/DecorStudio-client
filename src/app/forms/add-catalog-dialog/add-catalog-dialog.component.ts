import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { addWarehouse } from 'src/app/services/warehouse.service';
import { addCatalog } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-add-catalog-dialog',
  templateUrl: './add-catalog-dialog.component.html',
  styleUrls: ['./add-catalog-dialog.component.css']
})
export class AddCatalogDialogComponent {
  form!: FormGroup;
  user: any = []
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
       this.user = JSON.parse(userJSON);
       }
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  onConfirm(): void {
      const catalogData: addCatalog = {
        name: this.form.value.name,
        storeId: this.user.storeId
      }
      console.log(catalogData)
      this.dialogRef.close(catalogData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
