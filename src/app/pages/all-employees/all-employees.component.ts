import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.css']
})
export class AllEmployeesComponent implements OnInit{

  employees: any[] = [];
  user: any = [];
  displayedColumns: string[] = ['vreme', 'datum', 'dugme2'];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    this.userService.getEmployees(this.user.storeId).subscribe(data => {
      this.employees = data as any;
      console.log("Employees", this.employees);
    })
  }

  delete(id: string){
    this.userService.deleteUser(id).subscribe(data => {
      this.ngOnInit();
    })
  }
}
