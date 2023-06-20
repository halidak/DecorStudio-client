import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { customValidator } from './size.validators';
import { addWarehouse } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-add-warehouse-dialog',
  templateUrl: './add-warehouse-dialog.component.html',
  styleUrls: ['./add-warehouse-dialog.component.css']
})
export class AddWarehouseDialogComponent {
  warehouseForm!: FormGroup;
  user: any = []
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
       this.user = JSON.parse(userJSON);
       }
    this.warehouseForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      size:new FormControl('', [Validators.required, customValidator.valueInvalid])
    });
  }

  onConfirm(): void {
      const warehouseData: addWarehouse = {
        name: this.warehouseForm.value.name,
        address: this.warehouseForm.value.address,
        size: this.warehouseForm.value.size,
        storeId: this.user.storeId
      }
      console.log(warehouseData)
      this.dialogRef.close(warehouseData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
