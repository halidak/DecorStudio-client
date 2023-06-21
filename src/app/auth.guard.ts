import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService:UserService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const jwtHelper = new JwtHelperService();
      const token = localStorage.getItem('token');
      if(!token){
        this.router.navigate(['/login']);
        return false;
      }
  
      const isExpired = jwtHelper.isTokenExpired(token);
      
      if (isExpired) {
       this.userService.logout(); // Pozovite funkciju za odjavljivanje korisnika
       this.router.navigate(['']);
       return false;
     }
      return !isExpired;

  }
  
}
