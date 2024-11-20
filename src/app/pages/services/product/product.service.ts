import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { environment } from '../../../../environments/environment'
import { map, Observable } from 'rxjs';
import { Product } from '../../products/product';
import { selectProducts } from '../../products/store/product/product.selectors';
import { AppState } from '../../../store/app-state';
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productList$ = this.store.select(selectProducts);
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,) {}

  getCategory() {
    return this.http.get(
      environment.API_END_POINT + environment.METHODS.GET_ALL_CATEGORY
    );
  }

  getProducts(): Observable<{productList: Product[]}> {
    console.log("call getProducts service");
    return this.http.get(
      environment.API_END_POINT + environment.METHODS.GET_ALL_PRODUCT
    ) as Observable<{productList: Product[]}>;
  }

  createProduct(obj: Product):Observable<any> {
    console.log("create service: createProduct");
    return this.http.post(
      environment.API_END_POINT + environment.METHODS.CREATE_PRODUCT,
      obj
    );
  }

  updateProduct(obj: any) {
    return this.http.put(
      environment.API_END_POINT + environment.METHODS.UPDATE_PRODUCT,
      obj
    );
  }

  deleteProduct(Id: any) {
    return this.http.delete(
      environment.API_END_POINT + environment.METHODS.DELETE_PRODUCT + Id
    );
  }

/*  tmp(obj: any){
    return new Observable(observer => {  
      fetch(environment.API_END_POINT + environment.METHODS.GET_ALL_PRODUCT)  
        .then(response => response.json())  
        .then(pikachu => {
          observer.next(pikachu);  
          observer.complete();  
        })  
        .catch(err => observer.error(err)) 
    });
  }*/
}
