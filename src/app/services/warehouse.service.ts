import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  url = env.url;
  constructor(private http: HttpClient) { }

  getAll(id: number){
    return this.http.get(`${this.url}/Warehouse/all-warehouses/${id}`);
  }

  getWarehouse(id: number){
    return this.http.get(`${this.url}/Warehouse/warehouse/${id}`);
  }

  addWarehouse(warehouse: addWarehouse){
    return this.http.post(`${this.url}/Warehouse/add-warehouse`, warehouse);
  }
}

export interface addWarehouse{
  name: string;
  address: string,
  size: number,
  storeId: number
}