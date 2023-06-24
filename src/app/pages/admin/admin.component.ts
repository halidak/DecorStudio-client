import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStoreComponent } from 'src/app/forms/add-store/add-store.component';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  stores: any[] =[]
  displayedColumns: string[] = ['naziv', 'grad', 'adresa', 'broj zaposlenih', 'velicina', 'dugme'];
  constructor(private storeService: StoreService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.storeService.getStores().subscribe(data => {
      this.stores = data as any;
      console.log(this.stores)
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStoreComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.storeService.addStore(result).subscribe(data => {
        this.stores.push(result);
        this.stores = [...this.stores];
       })
      }
    });
  }

  delete(id: number){
    this.storeService.deleteStore(id).subscribe(data => {
      this.stores = this.stores.filter(x => x.id !== id);
    })
  }

}
