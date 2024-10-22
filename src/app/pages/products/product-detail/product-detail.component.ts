import { Component, Input, OnInit } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../product';
import { NavigationExtras, Router } from '@angular/router';
import { AppState } from "../../../store/app-state";
import { select, Store } from "@ngrx/store";
import { selectedProduct } from "../store/product/product.selectors";
import { filter, first, map, Observable, take, tap } from "rxjs";
import { productActions } from '../store/product/product.action';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [NgIf, UpperCasePipe, ReactiveFormsModule],
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: Product;
  selectedProduct?: Product;
  selectProduct$ = this.store.select(selectedProduct);


  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    
  }

  form = new FormGroup({
    categoryId: new FormControl('', {
      validators:[Validators.required]
    }),
    Sku: new FormControl('', {
      validators:[Validators.required]
    }),
    productName: new FormControl('', {
      validators:[Validators.required]
    }),
    productPrice: new FormControl('', {
      validators:[Validators.required]
    }),
    productShortName: new FormControl('', {
      validators:[Validators.required]
    }),
    productDescription: new FormControl('', {
      validators:[Validators.required]
    }),
    productImageUrl: new FormControl('', {
      validators:[Validators.required]
    }),
  });

 
  ngOnInit(): void {
    /*this.selectProduct$.subscribe(obg=>{
      console.log(obg);
    });*/
    
     this.selectProduct$.subscribe(obg=>{
      this.form.controls.categoryId.setValue(obg?.categoryId! as any);
      this.form.controls.Sku.setValue(obg?.productSku ?? "");
      this.form.controls.productName.setValue(obg?.productName ?? "");
      this.form.controls.productPrice.setValue(obg?.productPrice! as any);
      this.form.controls.productShortName.setValue(obg?.productShortName ?? "");
      this.form.controls.productDescription.setValue(obg?.productDescription ?? "");
      this.form.controls.productImageUrl.setValue(obg?.productImageUrl ?? "");
     
    });
     
  }

  get productNameIsInvalid(){
    return(
      this.form.controls.productName.touched &&
      this.form.controls.productName.dirty &&
      this.form.controls.productName.invalid
    );
  }

  get productPriceIsInvalid(){
    return(
      this.form.controls.productPrice.touched &&
      this.form.controls.productPrice.dirty &&
      this.form.controls.productPrice.invalid
    );
  }

  onSubmit(){
    console.log(this.form);
    const enteredProductName = this.form.value.productName;
    const enteredProductPrice = this.form.value.productPrice;
    console.log(enteredProductName, enteredProductPrice);
  }

}
