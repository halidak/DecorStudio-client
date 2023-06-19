import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecorService } from 'src/app/services/decor.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit{

  decor: any = [];
  id: number = 0;
  warehouse: any = [];

  constructor(private decorService: DecorService, private route: ActivatedRoute, private warehouseServie: WarehouseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +(params.get('id') ?? 0);
      this.decorService.getDecorFromWarehouse(this.id).subscribe(data => {
        this.decor = data;
        console.log(this.decor);
      }, err => {
        console.log(err);
      })
      this.warehouseServie.getWarehouse(this.id).subscribe(data => {
        this.warehouse = data;
        console.log(this.warehouse);
      })
    })
  }

  decorDetails(id: number){

  }

  addDecor(){
    
  }

}
