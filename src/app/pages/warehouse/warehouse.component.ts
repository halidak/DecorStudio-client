import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddWarehouseDialogComponent } from 'src/app/forms/add-warehouse-dialog/add-warehouse-dialog.component';
import { DialogComponent } from 'src/app/forms/dialog/dialog.component';
import { UserService } from 'src/app/services/user.service';
import { WarehouseService, addWarehouse } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: any[] = [];
  user: any = [];

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    this.loadWarehouses();
  }

  loadWarehouses(): void {
    this.warehouseService.getAll(this.user.storeId).subscribe(data => {
      this.warehouses = data as any[];
      console.log(this.warehouses);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddWarehouseDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addWarehouse(result as addWarehouse);
        console.log('Dialog closed with result:', result);
      }
    });
  }

  openWarehouse(id: number): void {
    this.router.navigate([`/warehouse/${id}/`]);
  }

  addWarehouse(warehouse: addWarehouse): void {
    this.warehouseService.addWarehouse(warehouse).subscribe(data => {
      this.loadWarehouses(); // Osvježavanje podataka nakon dodavanja novog warehouse-a
    });
  }
}
