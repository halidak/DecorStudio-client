import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/forms/dialog/dialog.component';
import { CatalogService } from 'src/app/services/catalog.service';
import { DecorService, addDecor } from 'src/app/services/decor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit{

  id: number = 0;
  decors: any[] = [];
  catalog: any = {};
  user: any = [];
  storeId: number = 0;
  constructor(private decorService: DecorService, 
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private router: Router,
    public userService: UserService,
    private dialog: MatDialog) { }

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
    this.route.paramMap.subscribe(param => {
      this.storeId = Number(param.get('storeId') ?? 0);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        id: this.id,
        storeId: this.storeId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.addDecor(this.id, result);
      }
    });
  }

  openDecor(id: number){
    this.router.navigate([`/decor/`, +id])
  }

  addDecor(catalogId: number, decorId: number){
    var ids: addDecor = {
      catalogId: catalogId,
      decorId: decorId
    }
    this.decorService.addDecoreInCatalog(ids).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    }
    ,err => {
      console.log(err)
    }
    )
  }

}
