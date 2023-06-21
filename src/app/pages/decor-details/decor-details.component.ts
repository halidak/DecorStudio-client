import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecorService } from 'src/app/services/decor.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-decor-details',
  templateUrl: './decor-details.component.html',
  styleUrls: ['./decor-details.component.css']
})
export class DecorDetailsComponent implements OnInit {

  id: number = 0;
  decor: any = [];
  warehouseId: number = 0;
  success = false;
  constructor(private decorService: DecorService, private route: ActivatedRoute, public userService: UserService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id') ?? 0);
      this.decorService.getDecor(this.id).subscribe((res: any) => {
        this.decor = res;
        console.log(this.decor)
      },
      err => {
        console.log(err)
      })
    })

    this.route.paramMap.subscribe(params => {
      this.warehouseId = Number(params.get('warehouseId') ?? 0);
    })

  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteDecor();
        this.router.navigate([`warehouse/${this.warehouseId}`]);
      }
    });
  }

  deleteDecor(){
    this.decorService.deleteDecor(this.id).subscribe(res => {
      console.log(res);
    },
    err => {
      console.log(err);
    })
  }

  openEditForm(){
    this.router.navigate(['edit-decor/' + this.id]);
  }

  add(){
    this.decorService.addToCart(this.decor);
    this.success = true;
  }
}
