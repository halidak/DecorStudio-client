import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit{

  userId: string = '';
  token: string = "";
  loading = false;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = String(params.get('email') ?? '');
      this.token = String(params.get('token') ?? '');
      this.loading = true;
      this.userService.verify(this.userId, this.token).subscribe(data => {
        console.log(data);
        this.router.navigate(['login']);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
        });
    })
  }
}
