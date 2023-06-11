import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores: any [] = [];

  constructor(private servise: StoreService, private router: Router) { }

  ngOnInit(): void {
    this.servise.getStores().subscribe((res: any) => {
      this.stores = res;
      console.log(this.stores)
    },
    err => {
      console.log(err)
    })
  }

  openCatalog(id: number){
    this.router.navigate([`/store/${id}`])
  }

}
