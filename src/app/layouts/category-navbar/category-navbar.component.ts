import { Component, OnInit, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DecorService } from 'src/app/services/decor.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit, OnDestroy {

  user: any = [];
  private cartItemsSubscription!: Subscription;

  public num = 0;
  constructor(public userService: UserService, private router: Router, public decorService: DecorService,  private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
    }
    this.cartItemsSubscription = this.decorService
      .getCartLengthObservable()
      .subscribe((cartLength) => {
        this.num = cartLength;
        this.cdr.detectChanges();
      });
  }
  
  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

  edit() {
    this.router.navigate([`edit/${this.user.id}`])
  }

  change() {
    this.router.navigate([`change-password`])
  }

  appointments() {
    this.router.navigate([`appointments`])
  }

  openDialog() {
    this.router.navigate(['reservation']);
  }

  addToCart(decor: any) {
    this.decorService.addToCart(decor); // Dodajte ovaj poziv kako biste ažurirali korpu
    this.cdr.detectChanges();
  }

  reservationList(){
    this.router.navigate(['reservation-list']);
  }
}
