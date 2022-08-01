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
  // getProducts(page: number){
  //   return this.httpClient.get(API_URL + '?page=' + page);
  // }
  getAll(): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products');
  }
  findById(id: any): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/' + id)
  }
  searchByName(name:any):Observable<Product[]> {
    return this.httpClient.get<Product[]>(API_URL + '/products/find-by-name?name='+name);
  }

  findNewProduct(): Observable<Product> {
    return this.httpClient.get<Product>(API_URL + '/products/find-new-product')
  }
 }
