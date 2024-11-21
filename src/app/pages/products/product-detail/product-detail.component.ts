import { Component, Input, OnInit } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interface/product';
import { NavigationExtras, Router } from '@angular/router';
import { AppState } from "../../../store/app-state";
import { select, Store } from "@ngrx/store";
import { selectedProduct } from "../store/product/product.selectors";
import { filter, first, map, Observable, take, tap } from "rxjs";
import { productActions } from '../store/product/product.action';
import { Action } from '../../interface/action';
import { environment } from '../../../../environments/environment';
import {Breakpoints} from '@angular/cdk/layout';



@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [NgIf, UpperCasePipe, ReactiveFormsModule],
})
export class ProductDetailComponent implements OnInit {
  //@Input() product?: Product;
  //selectedProduct?: Product;
  selectProduct$ = this.store.select(selectedProduct);
  productId: string  = '';
  action: Action = Action.None;
  


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

    console.log('Web ' + Breakpoints.Web);
console.log('WebLandscape ' + Breakpoints.WebLandscape);
console.log('WebPortrait ' + Breakpoints.WebPortrait);

console.log('Tablet ' + Breakpoints.Tablet);
console.log('TabletPortrait ' + Breakpoints.TabletPortrait);
console.log('TabletLandscape ' + Breakpoints.TabletLandscape);

console.log('Handset ' + Breakpoints.Handset);
console.log('HandsetLandscape ' + Breakpoints.HandsetLandscape);
console.log('HandsetPortrait ' + Breakpoints.HandsetPortrait);

console.log('XSmall ' + Breakpoints.XSmall);
console.log('Small ' + Breakpoints.Small);
console.log('Medium ' + Breakpoints.Medium);
console.log('Large ' + Breakpoints.Large);
console.log('XLarge ' + Breakpoints.XLarge);
    /*this.selectProduct$.subscribe(obg=>{
      console.log(obg);
    });*/
    
     this.selectProduct$.subscribe(obg=>{
      if(typeof obg!='undefined' && obg){
        this.productId = obg?.id as string;
        this.form.controls.categoryId.setValue(obg?.categoryId! as any);
        this.form.controls.Sku.setValue(obg?.productSku ?? "");
        this.form.controls.productName.setValue(obg?.productName ?? "");
        this.form.controls.productPrice.setValue(obg?.productPrice! as any);
        this.form.controls.productShortName.setValue(obg?.productShortName ?? "");
        this.form.controls.productDescription.setValue(obg?.productDescription ?? "");
        this.form.controls.productImageUrl.setValue(obg?.productImageUrl ?? "");
      }
      else
        this.action = Action.Create;
    });
     
    console.log(this.action);
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
    if(environment.isStubs === true && this.action === Action.Create )
        this.productId = this.newObjectId();
      
    const product: Product = {
      id: this.productId,
      productSku: this.form?.value.Sku ?? "",
      productName: this.form?.value.productName ?? "",
      productPrice: this.form?.value.productPrice! as any,
      productShortName: this.form?.value.productShortName ?? "",
      productDescription: this.form?.value.productDescription ?? "",
      createdDate: new Date(),
      deliveryTimeSpan: this.form?.value.productDescription ?? "",
      categoryId: this.form?.value.categoryId! as any,
      productImageUrl: this.form?.value.productImageUrl ?? "",
      userId: this.form?.value.categoryId! as any,
    }

    switch (this.action) {
      case Action.Create:
            this.store.dispatch(productActions.createProduct({ product: product}));
          break;
      case Action.Update:
          //console.log(product);
          this.store.dispatch(productActions.updateProduct({ product: product}));
          break;
      case Action.Delete:
        this.store.dispatch(productActions.deleteProduct({ productId: product.id}));
          break;
      default:
          throw new Error("unsupported country");
  }
   
    this.router.navigate(['/products']);

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
