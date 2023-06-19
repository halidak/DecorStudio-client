import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: any[] =[];
  user: any = []
  constructor(private warehouseService: WarehouseService, private router: Router) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
  if (userJSON) {
     this.user = JSON.parse(userJSON);
     }
    this.warehouseService.getAll(this.user.storeId).subscribe(data => {
      this.warehouses = data as any[];
      console.log(this.warehouses)
    })
  }

  openWarehouse(id: number){
    this.router.navigate([`/warehouse/${id}`])
  }
}
