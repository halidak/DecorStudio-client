import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class DecorService {

  url = env.url;
  constructor(private http: HttpClient) { }

  getDecorByCatalogId(id: number) {
    return this.http.get(this.url + '/Decor/decore-catalog/' + id);
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