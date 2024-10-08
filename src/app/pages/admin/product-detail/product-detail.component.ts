import { Component, Input, OnInit } from '@angular/core';
import { NgIf, UpperCasePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../products/product';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [NgIf, UpperCasePipe, ReactiveFormsModule],
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: Product;
  ppp!: Product;

  constructor(
    //private productSrv: ProductService,
    private router: Router
  ) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  form = new FormGroup({
    productName: new FormControl('', {
      validators:[Validators.required]
    }),
    productPrice: new FormControl('', {
      validators:[Validators.required]
    }),
  });

  ngOnInit(): void {
    const currentState = this.router.lastSuccessfulNavigation;
    //console.log(history.state.data.product);
    //this.form.controls.productName.setValue(currentState?.extras.);
    //this.ppp = currentState?.extras;
    //console.log(currentState?.extras?.state['']);
   
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
