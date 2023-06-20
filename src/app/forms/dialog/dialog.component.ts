import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DecorService, addDecor } from 'src/app/services/decor.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  decors: any[] = [];
  storeId: number = 0;
  catalogId: number = 0;
  user: any = [];
  selectedOption: number = 0;
  constructor(private decorService: DecorService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogComponent>,) {}

  ngOnInit(): void {
    // const userJSON = localStorage.getItem('user');
    // if (userJSON) {
    //    this.user = JSON.parse(userJSON);
    //    this.storeId = this.user.storeId;
    //   }
      this.catalogId = this.data.id;
      this.storeId = this.data.storeId;
    this.decorService.getDecorFromWarehouseWithStoreId(this.storeId, this.catalogId).subscribe(data => {
      this.decors = data as any[];
    })
  }

  onConfirm(): void {
    this.selectedOption = +(document.getElementById('decor') as HTMLInputElement).value;
    this.dialogRef.close(this.selectedOption);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
