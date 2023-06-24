import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SaveStore, StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent {

  constructor(private storeService: StoreService, private dialogRef: MatDialogRef<AddStoreComponent>) { }

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    numberOfEmployees: new FormControl('', [Validators.required]),
  })

  get Name(){
    return this.form.get('name');
  }

  get City(){
    return this.form.get('city');
  }

  get Size(){
    return this.form.get('size');
  }

  get Address(){
    return this.form.get('address');

  }

  get NumberOfEmployees(){
    return this.form.get('numberOfEmployees');
  }

  addStore() {
    var store: SaveStore = {
      name: this.Name?.value ?? '',
      city: this.City?.value ?? '',
      size: +(this.Size?.value ?? 0),
      address: this.Address?.value ?? '',
      numberOfEmployees: +(this.NumberOfEmployees?.value ?? 0)
    }

    this.dialogRef.close(store);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
