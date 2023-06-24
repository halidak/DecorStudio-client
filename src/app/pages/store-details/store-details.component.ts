import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCatalogDialogComponent } from 'src/app/forms/add-catalog-dialog/add-catalog-dialog.component';
import { AddWarehouseDialogComponent } from 'src/app/forms/add-warehouse-dialog/add-warehouse-dialog.component';
import { CatalogService, addCatalog } from 'src/app/services/catalog.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {

  store: any = {}
  id: number = 0;
  catalogs: any[] = []
  loading = false;
  constructor(private storeService: StoreService, 
    private router: ActivatedRoute, 
    private catalogService: CatalogService,
    private route: Router,
    public userService: UserService,
    private dialog: MatDialog,
    private cataloService: CatalogService) { }


  ngOnInit(): void {
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.storeService.getStoreById(this.id).subscribe(data => {
        this.store = data;
        console.log(this.store)
        this.loading = false;
      },
        err => {
          console.log(err)
          this.loading = false;
          })
      this.catalogService.getCatalogsByStoreId(this.id).subscribe((res: any) => {
        this.catalogs = res;
        console.log(this.catalogs)
      },
      err => {
          console.log(err);
        })
    })
  }

  addCatalog(): void {
    const dialogRef = this.dialog.open(AddCatalogDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.add(result);
        console.log('Dialog closed with result:', result);
      }
    });
  }

  add(cat: addCatalog){
    this.cataloService.addCatalog(cat).subscribe(data => {
      console.log(data)
      this.ngOnInit();
    },
    err => {
      console.log(err)
    })
  }

  openCatalogDetails(id: number){
    this.route.navigate([`/catalog/${this.store.id}/${id}`])
  }



}
