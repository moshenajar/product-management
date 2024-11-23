import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { Router } from '@angular/router';
import { selectCategories, selectedCategory } from './store/category/category.selectors';
import { Action } from '../interface/action';
import { Category } from '../interface/category';
import { categoryActions } from './store/category/category.action';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  product!: Category;
  selectedProduct?: Category;
  categoryList$ = this.store.select(selectCategories);
  category: number= 0;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.store.dispatch(categoryActions.loadCategories());
  }

  onSelect(category: Category): void {
    this.store.dispatch(categoryActions.setSelectCategory({category: category}));
    this.router.navigate(['/categorydetails']);
  }

  onCreate(): void {
    this.router.navigate(['/categorydetails']);
  }

}
