import { Action, createFeature, createReducer, on } from "@ngrx/store"
import { Product } from "../../product";
import { productActions } from "./product.action";
import { state } from "@angular/animations";

//export const productFeatureKey: "product" = 'product';
//export const productsFeatureKey = 'product';


export interface ProductState{
    selectedProduct: Product | null,
    productList: Product[] | null
}

const initialState: ProductState = {
    selectedProduct: null,
    productList: null
};

const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.resetProduct, (state) => ({
      selectedProduct: null,
      productList: null
    })),
    on(productActions.setSelectedProduct, (state, action) => ({
      ...state, 
      selectedProduct: action.product 
    })),
    on(productActions.loadProducts, (state) => ({
      ...state,
      productList: null,
      selectedProduct: null
    })),
    on(productActions.loadProductsSuccess, (state, {productList}) => ({
      ...state,
      productList,
      selectedProduct: null
    })),
    on(productActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      productList: null,
      selectedProduct: null
    })),
    on(productActions.updateProductSuccess, (state) => ({
      ...state,
      productList: null,
      selectedProduct: null
    })),
    on(productActions.updateProductFailure, (state, { error }) => ({
      ...state,
      productList: null,
      selectedProduct: null
    })),
  )
})

export const {
  name: productFeatureKey, 
  reducer: productReducer,
  //selectSelectedProduct
} = productFeature