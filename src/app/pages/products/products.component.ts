import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product/product.service';
import { Product } from '../interface/product';
import { ActivatedRoute, NavigationExtras, Router, RouterLink } from '@angular/router';
import { AppState } from '../../store/app-state';
import { Store } from "@ngrx/store";
import { productActions } from "../products/store/product/product.action";
import { selectProducts, selectCategories } from './store/product/product.selectors';
import { combineLatest, filter, map, Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  
  isSidePanelVisible: boolean = false;
  categoryList: any[] = [];
  product!: Product;
  selectedProduct?: Product;
  categories$ = this.store.select(selectCategories);
  productList$ = this.store.select(selectProducts);
  category: number= 0;

  
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productSrv: ProductService,
    route: ActivatedRoute
  ) 
  {
    route.queryParamMap.subscribe(params => {
      this.productList$ =  this.store.select(selectProducts).pipe(
        map(arr => 
          {
            this.category = parseInt(params.get("category")??"0", 10);
            if(this.category == 0) return arr
            return arr.filter(
              p => p.categoryId == this.category
            )
        }));
    });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
  }

  getAllCategory() {
    this.store.dispatch(productActions.loadCategories());
  }

  getProducts() {
    this.store.dispatch(productActions.loadProducts());
  }

  onSelect(product: Product): void {
    this.store.dispatch(productActions.setSelectedProduct({product: product}));
    this.router.navigate(['/productdetails']);
  }

  onCreate(): void {
    this.router.navigate(['/productdetails']);
  }

}
