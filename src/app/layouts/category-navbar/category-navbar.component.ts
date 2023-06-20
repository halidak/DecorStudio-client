import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit{

  user: any = [];
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
     const userJSON = localStorage.getItem('user');
  if (userJSON) {
     this.user = JSON.parse(userJSON);
     }
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['']);
  }

  edit(){
    this.router.navigate([`edit/${this.user.id}`])
  }

  change(){
    this.router.navigate([`change-password`])
  }
}
