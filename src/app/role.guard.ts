import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token || jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/login']);
      return false;
    }

    // Proverite ulogu korisnika
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user.roleId; // Pretpostavka: Uloga korisnika se nalazi u polju 'roleId'

    // Proverite dozvoljenu ulogu za pristup ruti
    const allowedRole = route.data['allowedRole']; // Pretpostavka: Dozvoljena uloga je definisana u data objektu rute

    // Proverite da li je uloga korisnika dozvoljena
    if (userRole === allowedRole) {
      return true; // Dozvoljen pristup
    } else {
      // Redirektujte korisnika na odgovarajuću stranicu za nedozvoljen pristup
      return this.router.navigate(['/login'])
  }
}
}
