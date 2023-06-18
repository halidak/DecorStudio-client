import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit{

  user: any = []
  constructor(public userService: UserService) { }

  ngOnInit(): void {
     const userJSON = localStorage.getItem('user');
  if (userJSON) {
     this.user = JSON.parse(userJSON);
     }
  }

  logout(){
    this.userService.logout();
    
  }

  edit(){
    //todo navigate to edit
  }
}
