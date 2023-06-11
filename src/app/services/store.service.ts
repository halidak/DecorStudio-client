import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url = environment.url;
  

  constructor(private http: HttpClient) { }

  getStores() {
    return this.http.get(this.url + '/Store/all-stores');
  }

  getStoreById(id: number) {
    return this.http.get(this.url + '/Store/get-store-by-id/' + id);
  }

}
