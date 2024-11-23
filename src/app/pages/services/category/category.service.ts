import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { Category } from '../../interface/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  /*getCategory() {
    return this.http.get(
      environment.API_END_POINT + environment.METHODS.GET_ALL_CATEGORY
    );
  }*/

  getCategories(): Observable<{categoryList: Category[]}> {
    console.log("call getCategories service");
    return this.http.get(
      environment.API_END_POINT + environment.METHODS.GET_ALL_CATEGORY
    ) as Observable<{categoryList: Category[]}>;
  }

  createCategory(obj: Category):Observable<any> {
    console.log("create service: createProduct");
    return this.http.post(
      environment.API_END_POINT + environment.METHODS.CREATE_CATEGORY,
      obj
    );
  }

  updateCategory(obj: any) {
    return this.http.put(
      environment.API_END_POINT + environment.METHODS.UPDATE_CATEGORY,
      obj
    );
  }

  deleteCategory(Id: any) {
    return this.http.delete(
      environment.API_END_POINT + environment.METHODS.DELETE_CATEGORY + Id
    );
  }

}
