import { Action, createFeature, createReducer, on } from "@ngrx/store"
import { Product } from "../../product";
import { productActions } from "./product.action";
import { state } from "@angular/animations";
import { environment } from "../../../../../environments/environment";

//export const productFeatureKey: "product" = 'product';
//export const productsFeatureKey = 'product';


export interface ProductState{
    selectedProduct: Product | null,
    //productList: Product[] | null
    productList: Product[],
    isStubs: boolean,
    isLoadProductsfromFile: boolean
}

const initialState: ProductState = {
    selectedProduct: null,
    //productList: null
    productList: [],
    isStubs: environment.isStubs,
    isLoadProductsfromFile: false
};

const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.resetProduct, (state) => ({
      selectedProduct: null,
      productList: [],
      isStubs: environment.isStubs,
      isLoadProductsfromFile: false
    })),
    on(productActions.setSelectedProduct, (state, action) => ({
      ...state, 
      selectedProduct: action.product 
    })),
    on(productActions.loadProducts, (state) => ({
      
        ...state,
        //productList: productList,
        selectedProduct: null,
        //isLoadProductsfromFile: isLoadingFromFile
      
    })),
    on(productActions.loadProductsSuccess, (state, {productList}) => {
      let isLoadingFromFile = false;
      if(state.isStubs === true)
      {
        isLoadingFromFile = true;
      }
      return{
        ...state,
        productList: productList,
        selectedProduct: null,
        isLoadProductsfromFile: isLoadingFromFile
      }
    }),
    on(productActions.loadProductsFailure, (state, { error }) => ({
      ...state,
      productList: [],
      selectedProduct: null
    })),
    on(productActions.updateProductSuccess, (state) => ({
      ...state,
      //productList: [],
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
    on(productActions.updateProduct, (state, { product }) => {
      const update: Partial<Product> & { id: string } = product;
      const updateProductList = state.productList.map(product => product.id !== update.id ? product : { ...product, ...update });
      return{
        ...state,
        productList: updateProductList,
        selectedProduct: null
      }
    }),
    on(productActions.deleteProduct, (state, { productId }) => {
      const updateProductList = state.productList.filter(obj => obj.id !== productId)
      return{
        ...state,
        productList: updateProductList,
        selectedProduct: null
      }
    }),
  )
})

export const {
  name: productFeatureKey, 
  reducer: productReducer,
  //selectSelectedProduct
} = productFeature