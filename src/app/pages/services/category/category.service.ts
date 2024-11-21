import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../../../store/app-state';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) { }

  getCategory() {
    return this.http.get(
      environment.API_END_POINT + environment.METHODS.GET_ALL_CATEGORY
    );
  }
}
