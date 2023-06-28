import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  public currentUserSubscription!: Subscription; // Promenjeno private u public
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public num = 0;
  constructor(
    public userService: UserService,
    private router: Router,
    public decorService: DecorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      this.user = JSON.parse(userJSON);
      this.userService.setCurrentUser(this.user);
      this.currentUserSubject.next(this.user);
    }
    this.cartItemsSubscription = this.decorService
      .getCartLengthObservable()
      .subscribe((cartLength) => {
        this.num = cartLength;
        this.cdr.detectChanges();
      });

    this.currentUserSubscription = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        this.user = user;
        this.cdr.detectChanges();
      });

    this.currentUserSubscription = this.userService
      .getCurrentUser()
      .subscribe((user) => {
        this.user = user;
        this.currentUserSubject.next(user);
        this.cdr.detectChanges();
      });

  }

  ngOnDestroy(): void {
    this.cartItemsSubscription.unsubscribe();
    this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
    this.currentUserSubject.next(null);
    this.router.navigate(['']);
    this.num = 0;
  }

  edit() {
    this.router.navigate([`edit/${this.user.id}`]);
  }

  change() {
    this.router.navigate([`change-password`]);
  }

  appointments() {
    this.router.navigate([`appointments`]);
  }

  openDialog() {
    this.router.navigate(['reservation']);
  }

  addToCart(decor: any) {
    this.decorService.addToCart(decor);
    this.cdr.detectChanges();
  }

  reservationList() {
    this.router.navigate(['reservation-list']);
  }

  employees(){
    this.router.navigate(['employees'])
  }
}
