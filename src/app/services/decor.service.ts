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
}
