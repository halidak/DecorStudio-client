import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
 url = env.url;

  constructor(private http: HttpClient) {
   }

  getCatalogsByStoreId(id: number) {
    return this.http.get(this.url + '/Catalog/get-all/' + id);
  }

  getCatalogById(id: number) {
    return this.http.get(this.url + '/Catalog/get-catalog-by-id/' + id);
  }
}
