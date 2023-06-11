import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog.service';
import { DecorService } from 'src/app/services/decor.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit{

  id: number = 0;
  decors: any[] = [];
  catalog: any = {};
  constructor(private decorService: DecorService, 
    private route: ActivatedRoute,
    private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = Number(param.get('id') ?? 0);
      this.decorService.getDecorByCatalogId(this.id).subscribe((res: any) => {
        this.decors = res;
        console.log(this.decors)
      },
      err => {
        console.log(err)
      })
      this.catalogService.getCatalogById(this.id).subscribe((res: any) => {
        this.catalog = res;
        console.log(this.catalog)
      }
      ,err => {
        console.log(err)
      }
      )
    })
  }

  openDecor(id: number){

  }

}
