import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {

  store: any = {}
  id: number = 0;
  catalogs: any[] = []
  constructor(private storeService: StoreService, 
    private router: ActivatedRoute, 
    private catalogService: CatalogService,
    private route: Router) { }


  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.storeService.getStoreById(this.id).subscribe(data => {
        this.store = data;
        console.log(this.store)
      },
        err => {
          console.log(err)
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

  openCatalogDetails(id: number){
    this.route.navigate([`/catalog/${id}`])
  }



}
