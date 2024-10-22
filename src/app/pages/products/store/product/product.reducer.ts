import { Action, createFeature, createReducer, on } from "@ngrx/store"
import { Product } from "../../product";
import { productActions } from "./product.action";

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
    on(productActions.setSelectedProduct, (state, action) => ({
      ...state, 
      selectedProduct: action.product 
    })),
    on(productActions.loadingAllProductsIntoStoreSuccess, (state, {productList}) => ({
      ...state,
      productList
    })),
  )
})

export const {
  name: productFeatureKey, 
  reducer: productReducer,
  //selectSelectedProduct
} = productFeature