import { Action, createFeature, createReducer, on } from "@ngrx/store"
import { Product } from "../../product";
import { productActions } from "./product.action";
import { state } from "@angular/animations";

//export const productFeatureKey: "product" = 'product';
//export const productsFeatureKey = 'product';


export interface ProductState{
    selectedProduct: Product | null,
    //productList: Product[] | null
    productList: Product[]
}

const initialState: ProductState = {
    selectedProduct: null,
    //productList: null
    productList: []
};

const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.resetProduct, (state) => ({
      selectedProduct: null,
      productList: []
    })),
    on(productActions.setSelectedProduct, (state, action) => ({
      ...state, 
      selectedProduct: action.product 
    })),
    on(productActions.loadProducts, (state) => ({
      ...state,
      //productList: [],
      selectedProduct: null
    })),
    on(productActions.loadProductsSuccess, (state, {productList}) => ({
      ...state,
      productList,
      selectedProduct: null
    })),
    on(productActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      productList: [],
      selectedProduct: null
    })),
    on(productActions.updateProductSuccess, (state) => ({
      ...state,
      productList: [],
      selectedProduct: null
    })),
    on(productActions.updateProductFailure, (state, { error }) => ({
      ...state,
      productList: [],
      selectedProduct: null
    })),
    on(productActions.createProduct, (state, { product }) => ({
      ...state,
      productList: [...state.productList, product],
      selectedProduct: null
    })),
  )
})

export const {
  name: productFeatureKey, 
  reducer: productReducer,
  //selectSelectedProduct
} = productFeature