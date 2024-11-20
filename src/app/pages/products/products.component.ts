import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product/product.service';
import { Product } from './product';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NavigationExtras, Router } from '@angular/router';
import { AppState } from '../../store/app-state';
import { Store } from "@ngrx/store";
import { productActions } from "../products/store/product/product.action";
import { selectProducts } from './store/product/product.selectors';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;

  categoryList: any[] = [];
  productsList: Product[] = [];
  //productsList$?: Observable<any[]>;
  product!: Product;
  selectedProduct?: Product;
  products: Product[] = [];
  productList$ = this.store.select(selectProducts);

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productSrv: ProductService
  ) {}

  ngOnInit(): void {
   
    /*if(environment.isStubs === true )
      {
        this.getProducts();
      }
    else if( environment.isStubs === false )*/
      this.getProducts();
  }

  getAllCategory() {
    //this.productSrv.getCategory().subscribe((res:any)=>{
    //  this.categoryList = res;
    //})
  }

  getProducts() {
    //if(environment.env != 'staging')
      this.store.dispatch(productActions.loadProducts());
  }

  onSave() {
    /*this.productSrv.saveProduct(this.product).subscribe((res: any) => {
      if (res.result) {
        alert('Product Created');
        this.getProducts();
      } else {
        alert(res.message);
      }
    });*/
  }

  /*openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }*/

  onSelect(product: Product): void {
    this.store.dispatch(productActions.setSelectedProduct({product: product}));
    this.router.navigate(['/productdetails']);
  }

  onCreate(): void {
    this.router.navigate(['/productdetails']);
  }

  onEdit(product: any) {
    /*this.productSrv.updateProduct(product).subscribe((res: any) => {
      if (res.result) {
        alert('Product Created');
        this.getProducts();
      } else {
        alert(res.message);
      }
    });*/
  }

  onDelete(Id: any) {
    /*this.productSrv.deleteProduct(Id).subscribe((res: any) => {
      if (res.result) {
        alert('Product Created');
        this.getProducts();
      } else {
        alert(res.message);
      }
    });*/
  }
}
