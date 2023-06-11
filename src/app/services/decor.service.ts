import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecorService {

  url = environment.url;
  constructor(private http: HttpClient) { }

  getDecorByCatalogId(id: number) {
    return this.http.get(this.url + '/Decor/decore-catalog/' + id);
  }
}
