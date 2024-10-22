import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { Product } from '../../products/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getCategory() {
    return this.http.get(
      Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY
    );
  }

  //getProducts(): Observable<{data: any[]}> {
  getProducts(): Observable<{productList: Product[]}> {
    //return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT) as Observable<{data: any[]}>;
    return this.http.get(
      Constant.API_END_POINT + Constant.METHODS.GET_ALL_PRODUCT
    ) as Observable<{productList: Product[]}>;
  }

  saveProduct(obj: any):Observable<any> {
    return this.http.post(
      Constant.API_END_POINT + Constant.METHODS.CREATE_PRODUCT,
      obj
    );
  }

  updateProduct(obj: any) {
    return this.http.put(
      Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT,
      obj
    );
  }

  deleteProduct(Id: any) {
    return this.http.delete(
      Constant.API_END_POINT + Constant.METHODS.UPDATE_PRODUCT + Id
    );
  }
}
