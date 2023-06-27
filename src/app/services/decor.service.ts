import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecorService {
  
  url = env.url;
  private cartLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this.getCartLength());
  
  constructor(private http: HttpClient) { }

  getDecorByCatalogId(id: number) {
    return this.http.get(this.url + '/Decor/decore-catalog/' + id);
  }

  getDecorByCatalogIdFiltered(id: number, filter: string) {
    return this.http.get(this.url + `/Decor/decore-catalog/${id}?filter=${filter}`);
  }

  getDecorFromWarehouse(id: number){
    return this.http.get<any[]>(this.url + '/Decor/decore-warehouse/' + id);
  }

  getDecor(id: number){
    return this.http.get(this.url + '/Decor/get-decor-by-id/' + id);
  }

  addDecor(decore: SaveDecor, id: number){
    return this.http.post(this.url + `/Decor/add-decor/${id}`, decore);
  }

  deleteDecor(id: number){
    return this.http.delete(this.url + '/Decor/delete-decor/' + id);
  }

  getDecorFromWarehouseWithStoreId(storeId: number, catalogId: number){
    return this.http.get(this.url + `/Decor/decores-from-warehouses/${storeId}/${catalogId}`);
  }

  addDecoreInCatalog(ids: addDecor){
    return this.http.post(this.url + `/Catalog/add-decor`, ids);
  }

  updateDecor(decor: SaveDecor, id: number){
    return this.http.put(this.url + `/Decor/update-decor/${id}`, decor);
  }
  getCart(): any[] {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  addToCart(decor: any) {
    const cartItems = this.getCart();
    const existingItem = cartItems.find(item => item.id === decor.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      decor.quantity = 1;
      cartItems.push(decor);
    }

    // Ažuriranje korpe u localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.updateCartCount();
  }

  private updateCartCount() {
    const cartItems = this.getCart();
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartLengthSubject.next(count);
  }

  removeFromCart(decorId: any) {
    const cartItems = this.getCart();
    const updatedCartItems = cartItems.filter(item => item.id !== decorId);
  
    // Ažuriranje korpe u localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    this.updateCartCount();
  }


  // updateCartLength(): void {
  //   const cartItems = this.getCart();
  //   const cartLength = cartItems.reduce((total, item) => total + item.quantity, 0);
  //   this.cartLengthSubject.next(cartLength);
  // }

  // Getter za broj stavki u korpi
  getCartLength(): number {
    const cartItems = this.getCart();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartLengthObservable(): Observable<number> {
    return this.cartLengthSubject.asObservable();
  }

  getUserReservation(id: string){
    return this.http.get(this.url + `/Decor/user-reservation/${id}`);
  }

  getReservationOfEmployee(id: string){
    return this.http.get(this.url + `/Decor/user-working/${id}`);
  }

  getReservationsFromStore(id: number){
    return this.http.get(this.url + `/Decor/decores-res/${id}`);
  }

  updateCartLength(cartLength: number): void {
    this.cartLengthSubject.next(cartLength);
  }
   
  
}

export interface SaveDecor{
  name: string;
  price: number;
  amount: number;
  type: string;
  description: string;
  image: string | File;
}

export interface addDecor{
  catalogId: number;
  decorId: number;
}