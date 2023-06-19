import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = env.url;

  constructor(private http: HttpClient) { }

  login(credentioalns: any) {
    return this.http.post(`${this.url}/User/login`, credentioalns);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  //todo
  changePassword(id: string, dto: ChangePasswordDto){
    return this.http.put(`${this.url}/User/change-password/${id}`, dto);
  }

  deleteUser(id: string){
    return this.http.delete(`${this.url}/User/delete-user/${id}`);
  }

}

export interface RegisterDto{
  firstName: string;
  lastName: string;
  userName: string;
  roleId: number;
  phoneNumber: string;
  password: string;
  storeId: number;
}

export interface UpdateDto{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  image: string;
}

export interface ChangePasswordDto {}
