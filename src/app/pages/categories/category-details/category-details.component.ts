import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app-state';
import { Router } from '@angular/router';
import { Action } from '../../interface/action';
import { selectedCategory } from '../store/category/category.selectors';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Category } from '../../interface/category';
import { categoryActions } from '../store/category/category.action';
import { CommonModule, NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, NgIf, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  selectCategory$ = this.store.select(selectedCategory);
  id: string  = '';
  action: Action = Action.None;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    
  }

  form = new FormGroup({
    category: new FormControl('', {
      validators:[Validators.required]
    }),
    categorySku: new FormControl('', {
      validators:[Validators.required]
    }),
    categoryName: new FormControl('', {
      validators:[Validators.required]
    }),
    categoryShortName: new FormControl('', {
      validators:[Validators.required]
    }),
    categoryDescription: new FormControl('', {
      validators:[Validators.required]
    }),
    categoryImageUrl: new FormControl('', {
      validators:[Validators.required]
    }),
  });

  ngOnInit(): void {

    this.selectCategory$.subscribe(obg=>{
      if(typeof obg!='undefined' && obg){
        this.id = obg?.id as string;
        this.form.controls.category.setValue(obg?.categoryId! as any);
        this.form.controls.categorySku.setValue(obg?.categorySku ?? "");
        this.form.controls.categoryName.setValue(obg?.categoryName ?? "");
        this.form.controls.categoryShortName.setValue(obg?.categoryShortName! as any);
        this.form.controls.categoryDescription.setValue(obg?.categoryDescription ?? "");
        this.form.controls.categoryImageUrl.setValue(obg?.categoryImageUrl ?? "");
      }
      else
        this.action = Action.Create;
    });
  }

  onSubmit(){
    
    if(environment.isStubs === true && this.action === Action.Create )
        this.id = this.newObjectId();
      
    const category: Category = {
      id: this.id,
      categoryId: this.form?.value.category! as any,
      categorySku: this.form?.value.categorySku ?? "",
      categoryName: this.form?.value.categoryName ?? "",
      categoryShortName: this.form?.value.categoryName ?? "",
      categoryDescription: this.form?.value.categoryDescription ?? "",
      createdDate: new Date(),
      categoryImageUrl: this.form?.value.categoryImageUrl ?? "",
      userId: 1977,
    }

    switch (this.action) {
      case Action.Create:
            this.store.dispatch(categoryActions.createCategory({ category: category}));
          break;
      case Action.Update:
          this.store.dispatch(categoryActions.updateCategory({ category: category}));
          break;
      case Action.Delete:
        this.store.dispatch(categoryActions.deleteCategory({ categoryId: category.id}));
          break;
      default:
          throw new Error("unsupported category action");
  }
   
    this.router.navigate(['/categories']);

    console.log(this.action);
  }

  public onUpdateClick(): void {
    this.action = Action.Update;
  }

  public onDeleteClick(): void {
    this.action = Action.Delete;
  }

  newObjectId() {
    
    const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
    const objectId = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    }).toLowerCase();

    console.log("objectId:" + objectId);

    return objectId;
  }


}
