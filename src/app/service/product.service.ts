import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }
  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products');
  }
  save(product: any): Observable<Product> {
    return this.httpClient.post<Product>(API_URL + '/products', product);
  }
  findById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/' + id)
  }

}
