import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url = env.url;
  

  constructor(private http: HttpClient) { }

  getStores() {
    return this.http.get(this.url + '/Store/all-stores');
  }

  getStoreById(id: number) {
    return this.http.get(this.url + '/Store/get-store-by-id/' + id);
  }

  addStore(store: SaveStore) {
    return this.http.post(this.url + '/Store/add-store', store);
  }

  deleteStore(id: number) {
    return this.http.delete(this.url + '/Store/delete-store/' + id);
  }

}

export interface SaveStore {
  name: string;
  city: string;
  address: string;
  size: number;
  numberOfEmployees: number;
}
