import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecorService } from 'src/app/services/decor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-decor-details',
  templateUrl: './decor-details.component.html',
  styleUrls: ['./decor-details.component.css']
})
export class DecorDetailsComponent implements OnInit {

  id: number = 0;
  decor: any = [];
  constructor(private decorService: DecorService, private route: ActivatedRoute, public userService: UserService) { }

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
  }
}
