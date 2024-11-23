import { Action, createFeature, createReducer, on } from "@ngrx/store"
import { Product } from "../../../interface/product";
import { productActions } from "./product.action";
import { environment } from "../../../../../environments/environment";
import { Category } from "../../../interface/category";

//export const productFeatureKey: "product" = 'product';
//export const productsFeatureKey = 'product';


export interface ProductState{
    selectedProduct: Product | null,
    productList: Product[],
    isStubs: boolean,
    isLoadProductsfromFile: boolean,
    //categoryList: Category[],
    //isLoadCategoriesfromFile: boolean,
}

const initialState: ProductState = {
    selectedProduct: null,
    productList: [],
    isStubs: environment.isStubs,
    isLoadProductsfromFile: false,
    //categoryList: [],
    //isLoadCategoriesfromFile: false
};

const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(productActions.resetProduct, (state) => ({
      selectedProduct: null,
      productList: [],
      isStubs: environment.isStubs,
      isLoadProductsfromFile: false,
      //categoryList: [],
      //isLoadCategoriesfromFile: false
    })),

    on(productActions.setSelectedProduct, (state, action) => ({
      ...state, 
      selectedProduct: action.product 
    })),

   /* on(productActions.setSelectCategory, (state, action) => {
      
      return{
        ...state, 
        selectCategory: action.categoryId 
      }
    }),*/

   /* on(productActions.loadCategories, (state) => ({
      
      ...state,
      selectedProduct: null,
    })),*/

   /* on(productActions.loadCategoriesSuccess, (state, {categoryList}) => {
      let isLoadingFromFile = false;
      if(state.isStubs === true)
      {
        isLoadingFromFile = true;
      }
      return{
        ...state,
        categoryList: categoryList,
        selectedProduct: null,
        isLoadCategoriesfromFile: isLoadingFromFile
      }
    }),*/
    /*on(productActions.loadCategoriesFailure, (state, { error }) => ({
      ...state,
      categoryList: [],
      selectedProduct: null
    })),*/


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
    on(productActions.updateProduct, (state, { product }) => {
      const update: Partial<Product> & { id: string } = product;
      const updateProductList = state.productList.map(product => product.id !== update.id ? product : { ...product, ...update });
      return{
        ...state,
        productList: updateProductList,
        selectedProduct: null
      }
    }),
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