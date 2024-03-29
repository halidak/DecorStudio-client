import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = env.url;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(credentioalns: any) {
    return this.http.post(`${this.url}/User/login`, credentioalns);
  }

  login_user(log: any){
    const isLoggedIn = log && log.token;
    if(isLoggedIn){
      this._isLoggedIn.next(true);
    } else {
      this._isLoggedIn.next(false);
    }
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isLogedIn(){
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }

  register(dto: RegisterDto){
    return this.http.post(`${this.url}/User/register`, dto);
  }

  isAdmin(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 4){
      return true;
    }
    return false;
  }

  isManager(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 1){
      return true;
    }
    return false;
  }

  isEmployee(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 2){
      return true;
    }
    return false;
  }

  isCustomer(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 3){
      return true;
    }
    return false;
  }

  hasImage(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.image){
      return true;
    }
    return false;
  }

  getUserEmail(email: string){
    return this.http.get(`${this.url}/User/get-user-by-email?email=${email}`);
  }

  getUserById(id: string){
    return this.http.get(`${this.url}/User/get-user-by-id/${id}`);
  }

  updateUser(id: string, dto: UpdateDto){
    return this.http.put(`${this.url}/User/update-user/${id}`, dto);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.url}/User/delete-user/${id}`);
  }

  changePassword(id: string, pass: ChangePasswordDto){
    return this.http.put(`${this.url}/User/change-password/${id}`, pass);
  }  

  verify(email: string, token: string){
    return this.http.get(`${this.url}/User/verify?userId=${email}&token=${token}`);
  }

  requestPasswordReset(email: emailDto) {
  
    return this.http.post(`${this.url}/User/request-password-reset`, email);
  }

  resetPassword(dto: resetDto){
    return this.http.post(`${this.url}/User/reset-password`, dto);
  }

  getEmployees(id: number){
    return this.http.get(`${this.url}/User/all-employees/${id}`);
  }
  
}

export interface emailDto{
  email: string;
}

export interface resetDto{
  userName: string;
  token: string;
  password: string;
}

export interface RegisterDto{
  firstName: string;
  lastName: string;
  userName: string;
  roleId: number;
  phoneNumber: string;
  password: string;
  storeId: number ;
}

export interface UpdateDto{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
